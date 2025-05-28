import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Experiances: Block = {
    slug: 'experiances',
    fields: [
        {
            type: 'array',
            name: 'experiances',
            fields: [
                {
                    type: 'text',
                    label: 'Title',
                    name: 'title',
                    required: true
                },
                {
                    type: 'richText',
                    editor: lexicalEditor(),
                    name: 'content'
                }
            ]
        }
    ]
}