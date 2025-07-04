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
            hasMany: true
        }, ...slugField()]
}