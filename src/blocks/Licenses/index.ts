import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const License: Block = {
    slug: 'license',
    interfaceName:'ILicenseProps',
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
            relationTo: 'licenses',
            name: 'licenses',
            label: 'Licenses',
            hasMany: true,
            admin:{
                appearance:'drawer',
            }
        }
    ]
}