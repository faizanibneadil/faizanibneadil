import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";

export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    admin: { useAsTitle: 'title' },
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [
        TitleField(),
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            type: 'join',
            name: 'Skills',
            collection: 'skills',
            on:'projects',
            hasMany:true
        },
        ...slugField(),
    ],
    // hooks: {
    //     afterChange: [revalidatePage],
    //     beforeChange: [populatePublishedAt],
    //     afterDelete: [revalidateDelete],
    // },
    versions: {
        drafts: {
            autosave: {
                interval: 100,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}