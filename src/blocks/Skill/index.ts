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
            minRows: 50
        },
        
    ]
}