import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const Certification: Block = {
    slug: 'certification',
    interfaceName:'ICertificationProps',
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
            relationTo: 'certifications',
            name: 'certifications',
            label: 'Certifications',
            hasMany: true,
            admin:{
                appearance:'drawer',
            }
        }
    ]
}