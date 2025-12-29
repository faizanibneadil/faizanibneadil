import { CollectionConfig } from "payload";

export const Integration: CollectionConfig<'integration'> = {
    slug: 'integration',
    fields: [
        {
            type: 'checkbox',
            name: 'enableChatButton',
            label: 'Enable Chat Button',
            defaultValue: false
        },
        {
            type: 'collapsible',
            label: 'Chat Bubble Integration',
            admin: {
                initCollapsed: true,
                condition: (fields, siblings) => siblings?.enableChatButton
            },
            fields: [
                {
                    type: 'select',
                    name: 'chatBubbleType',
                    label: 'Chat Bubble Type',
                    defaultValue: 'tawk',
                    options: [
                        { label: 'TAWK', value: 'tawk' }
                    ],
                },
                {
                    type: 'row',
                    admin: {
                        condition: (fields, siblings, user) => {
                            return siblings?.chatBubbleType === 'tawk'
                        }
                    },
                    fields: [
                        {
                            type: 'text',
                            name: 'tawkPropertyId',
                            label: 'TAWK Property ID',
                            admin: {
                                width: '33.33%'
                            }
                        },
                        {
                            type: 'text',
                            name: 'tawkWidgetId',
                            label: 'TAWK Widget ID',
                            admin: {
                                width: '33.33%'
                            }
                        },
                        {
                            type: 'checkbox',
                            name: 'enableTawkBubble',
                            label: 'Enable TAWK Chat Bubble',
                            defaultValue: false,
                            admin: {
                                width: '33.33%'
                            }
                        }
                    ]
                },
            ]
        }
    ]
}