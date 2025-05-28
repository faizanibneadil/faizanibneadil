import type { Block } from "payload";

export const Education: Block = {
    slug: 'education',
    fields: [
        {
            type: 'array',
            name: 'edus',
            label: 'Education',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label'
                        },
                        {
                            type: 'date',
                            name: 'from',
                            label: 'From'
                        },
                        {
                            type: 'date',
                            name: 'to',
                            label: 'To'
                        }
                    ]
                },
                {
                    type: 'text',
                    name: 'short_description',
                    label: 'Short Description'
                },
                {
                    type: 'relationship',
                    relationTo: 'media',
                    name: 'institute_image',
                    label: 'Select Institute Logo'
                }
            ]
        }
    ]
}