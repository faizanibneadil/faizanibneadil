import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    admin: { useAsTitle: 'title' },
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true
        },
        {
            type: 'richText',
            name: 'content',
            label: false,
            editor: lexicalEditor()
        }
    ]
}