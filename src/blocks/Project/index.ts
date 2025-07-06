import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Project: Block = {
    slug: 'project',
    interfaceName:'IProjectProps',
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
            relationTo: 'projects',
            name: 'projects',
            label: 'Projects',
            hasMany: true,
            admin: {
                appearance: 'drawer',
            }
        }
    ]
}