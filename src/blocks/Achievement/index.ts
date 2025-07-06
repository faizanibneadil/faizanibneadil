import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const Achievement: Block = {
    slug: 'achievement',
    interfaceName:'IAchievementProps',
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
            relationTo: 'achievements',
            name: 'achievements',
            label: 'Achievement',
            hasMany: true,
            admin:{
                appearance:'drawer',
            }
        }
    ]
}