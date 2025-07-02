import { CollectionConfig } from "payload";

export const researches: CollectionConfig<'researches'> = {
    slug: 'researches',
    admin: {
        useAsTitle: 'title',
        hidden: ({ user }) => user?.field !== 'education_teaching'
    },
    fields: [{
        type: 'text',
        name: 'title',
        label: 'Title',
        required: true
    }]
}