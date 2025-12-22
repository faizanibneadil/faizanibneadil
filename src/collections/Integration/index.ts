import { CollectionConfig } from "payload";

export const Integration: CollectionConfig<'integration'> = {
    slug: 'integration',
    fields: [
        {
            type: 'collapsible',
            label: 'Chat Bubble Integration',
            admin: {
                initCollapsed: true
            },
            fields: [
                {
                    type: 'select',
                    name: 'chatBubbleType',
                    defaultValue: 'tawk',
                    options: [
                        { label: 'TAWK', value: 'tawk' }
                    ]
                },
                {
                    type: 'row',
                    admin: {
                        condition: (fields,siblings,user) => {
                            return fields?.chatBubbleType === 'tawk'
                        }
                    },
                    fields: [
                        {
                            type: 'text',
                            name: 'tawlPropertyId',
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            type: 'text',
                            name: 'tawkWidgetId',
                            admin: {
                                width: '50%'
                            }
                        }
                    ]
                },
            ]
        }
    ]
}