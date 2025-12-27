import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
// import { NavigationGroups } from "@/constants";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { BlocksFeature, CodeBlock, LinkFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig, RelationshipField } from "payload";


export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
        preview: generatePreview({ collection: 'blogs' })
    },
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [
        TitleField(),
        {
            type: 'richText',
            name: 'content',
            label: false,
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [
                        ...rootFeatures,
                        LinkFeature({
                            maxDepth: 5,
                            enabledCollections: ['blogs', 'pages','projects'],
                            fields: ({ config, defaultFields }) => {
                                const _defaultFields = defaultFields.map(field => {
                                    if ('name' in field && field.name === 'doc') {
                                        return {
                                            ...field,
                                            filterOptions: ({ req: { headers } }) => {
                                                const selectedTenant = getTenantFromCookie(headers, 'number') as number
                                                if (selectedTenant) {
                                                    return {
                                                        'tenant.id': {
                                                            in: [selectedTenant]
                                                        }
                                                    }
                                                }
                                                return null
                                            },
                                        } as RelationshipField
                                    }
                                    return field
                                })
                                return [
                                    ..._defaultFields,
                                    {
                                        type: 'select',
                                        name: 'linkStyle',
                                        defaultValue: 'normal',
                                        options: [
                                            { label: 'normal', value: 'normal' },
                                            { label: 'Glimpse Style Preview', value: 'GlimpseStyle' }
                                        ],
                                        required: true
                                    },
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
                        }),
                        BlocksFeature({
                            blocks: ['formBlock', 'project', 'code-block'],
                        }),
                    ]
                },
            })
        },
        {
            type: 'richText',
            name: 'description',
            label: false,
            admin: {
                description: 'Blog short description.'
            },
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...defaultFeatures, ...rootFeatures]
                },
            })
        },
        {
            type: 'upload',
            name: 'featured_image',
            label: 'Featured Image',
            relationTo: 'media',
            hasMany: false,
            required: true,
            admin: {
                position: 'sidebar'
            },
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}