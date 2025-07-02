import { Block } from "payload";

export const Experiances: Block = {
    slug: 'experiances',
    interfaceName: 'IExperiancesProps',
    fields: [
        {
            type: 'array',
            name: 'experiances',
            fields: [
                {
                    type: 'text',
                    label: 'Title',
                    name: 'title',
                    required: true
                },
                {
                    type: 'text',
                    label: 'Company',
                    name: 'company',
                },
                {
                    type: 'text',
                    label: 'Sub Title',
                    name: 'subtitle',
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