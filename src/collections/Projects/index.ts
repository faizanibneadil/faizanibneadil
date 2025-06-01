import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { icons } from 'lucide-react'


export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    admin: { useAsTitle: 'title' },
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