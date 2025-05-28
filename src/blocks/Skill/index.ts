import type { Block } from "payload";

export const Skills: Block = {
    slug: 'skills',
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