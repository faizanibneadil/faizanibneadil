import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";


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