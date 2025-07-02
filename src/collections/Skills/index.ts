import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";

export const skills: CollectionConfig<'skills'> = {
    slug: 'skills',
    admin: {
        useAsTitle: 'title'
    },
    fields: [{
        type: 'text',
        name: 'title',
        label: 'Skill'
    }, {
        name: 'publishedAt',
        type: 'date',
        admin: {
            position: 'sidebar',
        },
    }, {
       type: 'relationship',
       name: 'projects',
       relationTo: 'projects',
       hasMany:true
    }, ...slugField()]
}