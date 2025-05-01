import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Notes:CollectionConfig<'notes'> = {
    slug: 'notes',
    admin:{
        useAsTitle:'title'
    },
    fields: [
        { 
            type: 'text',
            label: 'Title',
            name:'title',
            required:true
        },
        {
            type:'richText',
            editor: lexicalEditor(),
            name:'content',
            label: 'Note Content'
        }
    ]
}