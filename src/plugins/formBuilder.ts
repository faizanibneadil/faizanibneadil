import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";


export const formBuilder = formBuilderPlugin({
    formOverrides: {
        trash: true,
        access: {
            create: superAdminOrTenantAdminAccess,
            delete: superAdminOrTenantAdminAccess,
            read: () => true,
            update: superAdminOrTenantAdminAccess,
        },
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
        }
    },
    fields: {
        checkbox: true,
        country: true,
        date: true,
        email: true,
        message: true,
        number: true,
        select: true,
        state: true,
        text: true,
        textarea: true
    },
    redirectRelationships: ['pages']
})