import { NavigationGroups } from "@/constants";
import { IconField } from "@/fields/icon";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import type { CollectionConfig } from "payload";

export const Skills: CollectionConfig<'skills'> = {
    slug: 'skills',
    admin: {
        useAsTitle: 'title',
        group: NavigationGroups.resume
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
            type: 'group',
            name: 'techstack',
            label: 'Tech Stack',
            admin: { description: 'If you want to show an icon of the skill instead of skill as name then you have to select an icon from icons collection. REMEMBER: If the icon is available on skill only icon will be display.' },
            fields: [IconField()]
        }, {
            type: 'relationship',
            name: 'projects',
            relationTo: 'projects',
            hasMany: true,
            admin: {
                description: 'Select those project in whitch you used this skill.',
                appearance: 'drawer'
            }
        },
        ...slugField()
    ],
    versions: {
        drafts: {
            autosave: {
                interval: 30000,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}