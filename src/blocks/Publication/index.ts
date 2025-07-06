import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const Publication: Block = {
    slug: 'publication',
    interfaceName:'IPublicationProps',
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
            relationTo: 'publications',
            name: 'publications',
            label: 'Publications',
            hasMany: true,
            admin:{
                appearance:'drawer',
            }
        }
    ]
}