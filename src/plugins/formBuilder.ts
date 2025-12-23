import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";


export const formBuilder = formBuilderPlugin({
    formOverrides: {
        trash: true,
        access: {
            create: superAdminOrTenantAdminAccess,
            delete: superAdminOrTenantAdminAccess,
            read: () => true,
            update: superAdminOrTenantAdminAccess,
        },
        fields: ({ defaultFields }) => {
            return defaultFields.map((field) => {
                if ('name' in field && field.name === 'confirmationMessage') {
                    return {
                        ...field,
                        editor: lexicalEditor({
                            features: ({ rootFeatures }) => {
                                return [
                                    ...rootFeatures,
                                    FixedToolbarFeature(),
                                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] })
                                ]
                            }
                        })
                    }
                }
                return field
            })
        }
        // versions: {
        //     drafts: {
        //         autosave: {
        //             interval: 375,
        //         },
        //         schedulePublish: true,
        //     },
        //     maxPerDoc: 50,
        // }
    },
    formSubmissionOverrides: {
        access: {
            create: superAdminOrTenantAdminAccess,
            delete: superAdminOrTenantAdminAccess,
            read: () => true,
            update: superAdminOrTenantAdminAccess,
        },
        // fields: ({ defaultFields }) => {
        //     const fields = defaultFields.map(field => ({
        //         ...field,
        //         admin: {
        //             readOnly: true
        //         }
        //     }))
        //     return fields
        // }
    },
    fields: {
        payment: false
    },
    redirectRelationships: ['pages']
})