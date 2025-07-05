import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import type { CollectionConfig } from "payload";

export const Skills: CollectionConfig<'skills'> = {
    slug: 'skills',
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        TitleField(),
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        }, {
            type: 'relationship',
            name: 'projects',
            relationTo: 'projects',
            hasMany: true,
            admin: {
                description: 'Select those project in whitch you used this skill.',
                appearance: 'drawer'
            }
        }, ...slugField()],
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