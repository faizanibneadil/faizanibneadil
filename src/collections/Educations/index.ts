import { CollectionConfig } from "payload";

export const Educations:CollectionConfig<'educations'> = {
    slug:'educations',
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