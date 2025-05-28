import type { Block } from "payload";

export const Skill: Block = {
    slug: 'skill',
    fields: [
        {
            type: 'relationship',
            relationTo: 'skills',
            name: 'skills',
            label: 'Skills',
            hasMany: true
        }
    ]
}