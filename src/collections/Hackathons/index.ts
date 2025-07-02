import { CollectionConfig } from "payload";

export const hackathons:CollectionConfig<'hackathons'> = {
    slug: 'hackathons',
    admin:{ 
        useAsTitle: 'title',
        hidden: ({user}) => user?.field !== 'information_technology'
    },
    fields: [{
        type: 'text',
        name: 'title',
        label: 'Title',
        required: true,
    }]
}