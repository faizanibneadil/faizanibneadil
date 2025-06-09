import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { icons } from 'lucide-react'
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";


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
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true
        },
        {
            type: 'select',
            name: 'icon',
            label: 'Icon',
            options: Object.keys(icons).map(icon => ({ label: icon, value: icon }))
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        ...slugField()
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