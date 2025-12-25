import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Newsletter: Block = {
    slug: 'newsletter',
    interfaceName: 'TNewsletterBlockProps',
    fields: [
        {
            type: 'text',
            name: 'heading',
            label: 'Heading',
            required: true,
            defaultValue: 'Subscribe to our newsletter'
        },
        {
            type: 'richText',
            name: 'description',
            editor: lexicalEditor(),
            label: 'Description',
        },
        {
            type: 'relationship',
            relationTo: 'forms',
            name: 'form',
            label: 'Select Form'
        }
    ]
}