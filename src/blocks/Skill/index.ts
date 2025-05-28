import type { Block } from "payload";

export const Skills: Block = {
    slug: 'skills',
    interfaceName: 'ISkillsProps',
    fields: [
        {
            type: 'array',
            name: 'skills',
            fields: [
                {
                    type: 'text',
                    name: 'skill'
                }
            ]
        }
    ]
}