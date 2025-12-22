import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const BlogsBlock: Block = {
    slug: 'blogs-block',
    labels: { singular: 'Blog', plural: 'Blogs' },
    interfaceName: 'IBlogsBlockProps',
    fields: [
        {
            type: 'text',
            name: 'heading',
            label: 'Heading',
            required: true,
        },
        {
            type: 'richText',
            name: 'description',
            editor: lexicalEditor(),
            label: 'Description'
        },
        {
            type: 'relationship',
            relationTo: 'blogs',
            name: 'blogs',
            label: 'Blogs',
            hasMany: true,
            admin: {
                appearance: 'drawer',
            }
        }
    ]
}