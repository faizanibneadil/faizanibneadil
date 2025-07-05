import type { Block } from "payload";

export const Education: Block = {
    slug: 'education',
    interfaceName: 'TEducationProps',
    fields: [
        {
            type: 'relationship',
            relationTo: 'educations',
            name: 'educations',
            label: 'Educations',
            hasMany: true,
            admin: {
                appearance: 'drawer',
            }
        }
    ]
}