import type { Block } from "payload";

export const Skill: Block = {
    slug: 'skill',
    interfaceName: 'ISkillProps',
    fields: [
        {
            type: 'checkbox',
            name: 'showAllSkills',
            label: 'Show All Created Skills Automatically',
            defaultValue: false,
            admin: {
                position: 'sidebar',
                description: 'Check this to display every skill from your collection. Uncheck to manually select specific skills.',
            },
        },
        {
            type: 'relationship',
            relationTo: 'skills',
            name: 'userSkills',
            hasMany: true,
            maxRows: 50,
            admin: {
                // appearance: 'drawer',
                description: 'Choose specific skills you want to showcase.',
                condition: (data, siblingData) => !siblingData?.showAllSkills,
            }
        },
    ]
}