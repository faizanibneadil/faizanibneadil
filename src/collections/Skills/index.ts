import { CollectionConfig } from "payload";

export const Skills:CollectionConfig<'skills'> = {
    slug:'skills',
    admin:{ useAsTitle:'title'},
    fields:[
        {
            type:'text',
            label:'Title',
            name:'title'
        }
    ]
}