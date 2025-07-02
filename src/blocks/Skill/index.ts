import type { Block } from "payload";

export const Skills: Block = {
    slug: 'skills',
    interfaceName: 'ISkillsProps',
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