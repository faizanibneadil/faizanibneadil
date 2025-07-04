import type { Block } from "payload";

export const Education: Block = {
    slug: 'education',
    interfaceName: 'TEducationProps',
    fields: [
        {
            type: 'array',
            name: 'educations',
            fields: [
                {
                    type: 'text',
                    label: 'Title',
                    name: 'title',
                    required: true
                },
                {
                    type: 'text',
                    label: 'Academy',
                    name: 'academy',
                },
                {
                    type: 'text',
                    label: 'Degree',
                    name: 'degree',
                },
                {
                    type: 'date',
                    name: 'start',
                    label: 'Start'
                },
                {
                    type: 'date',
                    name: 'end',
                    label: 'End'
                },
                {
                    type: 'textarea',
                    name: 'description',
                    label: 'Description'
                }
            ],
            admin:{
                initCollapsed:true
            }
        }
    ]
}