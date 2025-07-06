import type { Block } from "payload";

export const Skill: Block = {
    slug: 'skill',
    interfaceName: 'ISkillProps',
    fields: [
        {
            type:'relationship',
            relationTo:'skills',
            name:'userSkills',
            hasMany:true,
            maxRows: 50,
            admin:{
                appearance: 'drawer'
            }
        },
    ]
}