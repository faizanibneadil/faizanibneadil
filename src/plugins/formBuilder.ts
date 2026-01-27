import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { RevalidatePageAfterChange } from "@/hooks/RevalidatePage";
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
        hooks: {
            afterChange: [
                RevalidatePageAfterChange({
                    invalidateRootRoute: true
                })
            ]
        },
        fields: ({ defaultFields }) => {
            // console.log({ defaultFields })
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
                if ('name' in field && field.name === 'submitButtonLabel') {
                    return {
                        type: 'row',
                        fields: [
                            { ...field, admin: { width: '33.33%' } },
                            { type: 'number', defaultValue: 100, name: 'submitButtonWidth', label: 'Submit Button Width (percentage)', admin: { width: '33.33%' } },
                            { type: 'text', defaultValue: 'Loading...', name: 'submitButtonLoadingText', label: 'Submit Button Loading Text', admin: { width: '33.33%', description: 'e.g: (Loading..., Submitting..., Subscribing...) etc' } }
                        ]
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
            create: () => true,
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