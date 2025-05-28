import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    admin: { useAsTitle: 'title' },
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title'
        },
        {
            type: 'blocks',
            name: 'layout',
            label: 'Design You\'r Page',
            blocks: [],
            blockReferences: ['blog', 'contact', 'education', 'hero', 'skills', 'experiances','about']
        }
    ]
}