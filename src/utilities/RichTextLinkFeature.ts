import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities"
import { LinkFeature } from "@payloadcms/richtext-lexical"
import type { RelationshipField } from "payload"

export const RichTextLinkFeature = () => {
    return LinkFeature({
        maxDepth: 5,
        enabledCollections: ['blogs', 'pages', 'projects'],
        fields: ({ config, defaultFields }) => {
            const _defaultFields = defaultFields.map(field => {
                if ('name' in field && field.name === 'doc') {
                    return {
                        ...field,
                        filterOptions: ({ req: { headers } }) => {
                            const selectedTenant = getTenantFromCookie(headers,'number')
                            if (selectedTenant) {
                                return {
                                    'tenant.id': {
                                        equals: selectedTenant
                                    }
                                }
                            }
                            return null
                        }
                    } as RelationshipField
                }
                return field
            })
            return [
                ..._defaultFields,
                {
                    name: 'rel',
                    label: 'Rel Attribute',
                    type: 'select',
                    hasMany: true,
                    options: ['noopener', 'noreferrer', 'nofollow'],
                    admin: {
                        description:
                            'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                    },
                },
            ]
        }
    })
}