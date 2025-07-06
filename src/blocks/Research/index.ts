import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const Research: Block = {
    slug: 'research',
    interfaceName:'IResearchProps',
    fields: [
        {
            type: 'text',
            name:'heading',
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
            relationTo: 'researches',
            name: 'researches',
            label: 'Researches',
            hasMany: true,
            admin:{
                appearance:'drawer',
            }
        }
    ]
}