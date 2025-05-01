import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Experiances:CollectionConfig<'experiances'> = {
    slug: 'experiances',
    fields:[
        {
            type:'text',
            label:'Title',
            name:'title',
            required:true
        },
        {
            type:'richText',
            editor:lexicalEditor(),
            name:'content'
        }
    ]
}