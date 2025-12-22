import { Block } from "payload";

export const Experience: Block = {
    slug: 'experience',
    interfaceName: 'IExperienceProps',
    fields: [
        {
           type: 'relationship',
           name: 'relatedExperiences',
           relationTo: 'experiences',
           hasMany: true
        }
    ]
}