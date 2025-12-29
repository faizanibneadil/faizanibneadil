import { Iconify } from "@/fields/iconify";
import type { Block } from "payload";
import { text as validateTextField } from 'payload/shared'


export const LogoTimeline: Block = {
    slug: 'eldoraUILogoTimelineBlock',
    interfaceName: 'TEldoraUILogoTimelineBlockProps',
    labels: { plural: 'Logos Timelines', singular: 'Logo Timeline' },
    fields: [
        {
            type: 'text',
            name: 'label',
            label: 'label',
            required: true
        },
        {
            type: 'radio',
            name: 'heightStyleType',
            label: 'Height Class',
            defaultValue: 'tailwind',
            options: [
                { label: 'Use Tailwind', value: 'tailwind' },
                { label: 'Use CSS', value: 'css' }
            ]
        },
        {
            type: 'json',
            name: 'heightStylesInCSS',
            label: 'Style Object',
            admin: {
                condition: (fields, siblings) => siblings?.heightStyleType === 'css'
            },
        },
        {
            type: 'text',
            name: 'heightStylesInTailwind',
            label: 'Tailwind Style Classes',
            defaultValue: 'h-[400px] sm:h-[800px]',
            admin: {
                description: 'Height of the timeline container (e.g., "h-[400px]", "h-screen")',
                condition: (fields, siblings) => siblings?.heightStyleType === 'tailwind'
            },
            hasMany: false,
            // validate: (value, ctx) => {
            //     // if (ctx.siblingData.heightStyleType === 'tailwind' && !value) {
            //     //     return 'Height classes are required.'
            //     // }
            //     return validateTextField(value, ctx)
            // }
        },
        {
            type: 'radio',
            name: 'additionalContainerStyleType',
            label: 'Height Class',
            defaultValue: 'tailwind',
            options: [
                { label: 'Use Tailwind', value: 'tailwind' },
                { label: 'Use CSS', value: 'css' }
            ]
        },
        {
            type: 'json',
            name: 'containerStylesInCSS',
            label: 'Style Object',
            admin: {
                condition: (fields, siblings) => siblings?.heightStyleType === 'css'
            }
        },
        {
            type: 'text',
            name: 'containerStylesInTailwind',
            label: 'Tailwind Style Classes',
            hasMany: false,
            admin: {
                description: 'Additional CSS classes for the container',
                condition: (fields, siblings) => siblings?.additionalContainerStyleType === 'tailwind'
            }
        },
        {
            type: 'number',
            name: 'iconSize',
            label: 'Icon Size',
            defaultValue: 16,
            admin: {
                description: 'Size of icons in pixels'
            }
        },
        {
            type: 'radio',
            name: 'useCase',
            label: 'Use Cases',
            defaultValue: 'logos',
            admin: {
                description: 'If you want to display the registered users with there profiles then select users by default logos is selected.'
            },
            options: [
                { label: 'Use Custom logos', value: 'logos' },
                { label: 'Use Registered Users', value: 'users' }
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'checkbox',
                    name: 'showRowSeparator',
                    label: 'Show Row Separator',
                    defaultValue: true,
                    admin: {
                        width: '50%',
                        description: 'Whether to display separator lines between rows'
                    }
                },
                {
                    type: 'checkbox',
                    name: 'animateOnHover',
                    label: 'Animate On Hover',
                    defaultValue: false,
                    admin: {
                        width: '50%',
                        description: 'If checked, animations only play when the component is hovered'
                    }
                }
            ]
        },
        {
            type: 'array',
            name: 'items',
            maxRows: 50,
            labels: { plural: 'Logos', singular: 'Logo' },
            admin: {
                initCollapsed: true,
                description: 'Array of logo items to display on the timeline (required)',
                condition: (fields, siblings) => siblings?.useCase === 'logos'
            },
            fields: [
                Iconify(),
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label',
                            admin: {
                                width: '50%',
                                description: 'Icon key from the Icons object (e.g., "discord", "gitHub", "google")'
                            }
                        },
                        {
                            type: 'number',
                            name: 'animationDelay',
                            label: 'Animation Delay',
                            defaultValue: -50,
                            admin: {
                                width: '50%',
                                description: 'Animation delay in seconds (typically negative, e.g., -23)'
                            }
                        },
                        {
                            type: 'number',
                            name: 'animationDuration',
                            label: 'Animation Duration',
                            defaultValue: 50,
                            admin: {
                                width: '50%',
                                description: 'Animation duration in seconds (e.g., 30, 40, 45, 60)'
                            }
                        },
                        {
                            type: 'number',
                            name: 'row',
                            label: 'Row',
                            defaultValue: 1,
                            admin: {
                                width: '50%',
                                description: 'Row index (1-based) to group logos on the same timeline row'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}