import { CollectionConfig } from "payload";

export const Projects:CollectionConfig<'projects'> = {
    slug: 'projects',
    admin:{useAsTitle:'title'},
    fields:[
        {
            type:'text',
            name:'title',
            label:'Title',
            required:true
        }
    ]
}