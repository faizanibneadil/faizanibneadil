import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const Hackathon: Block = {
    slug: 'hackathon',
    interfaceName:'IHackathonProps',
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
            relationTo: 'hackathons',
            name: 'hackathons',
            label: 'Hackathons',
            hasMany: true,
            admin:{
                appearance:'drawer',
            }
        }
    ]
}