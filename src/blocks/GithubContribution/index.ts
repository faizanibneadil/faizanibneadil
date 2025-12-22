import { Block } from "payload";

export const GitHubContributionsBlock: Block = {
    slug: 'github-contributions',
    interfaceName: 'IGithubContributionProps',
    fields: [
        {
            type: 'radio',
            name: 'githubContributionGraphConfig',
            admin: {
                description: 'By default we will use username from social link.'
            },
            required:true,
            defaultValue: 'useSocialUsername',
            options: [
                { label: 'Use different username', value: 'useAnotherUsername' },
                { label: 'Use social username', value: 'useSocialUsername' },
            ]
        },
        {
            type: 'text',
            name: 'username',
            admin: {
                condition: (fields, siblings, user) => {
                    return false
                }
            }
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'checkbox',
                    name: 'hideMonthLabels',
                    label: 'Hide Month Labels',
                    defaultValue: false,
                    required: true
                },
                {
                    type: 'checkbox',
                    name: 'withTooltip',
                    label: 'With Tooltip',
                    defaultValue: false,
                    required: true
                }
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'number',
                    name: 'graphBlockMargin',
                    label: 'Block Margin',
                    defaultValue: 3,
                    required: true
                },
                {
                    type: 'number',
                    name: 'graphBlockSize',
                    label: 'Block Size',
                    defaultValue: 10,
                    required: true
                },
                {
                    type: 'number',
                    name: 'graphFontSize',
                    label: 'Font Size',
                    defaultValue: 11,
                    required: true
                },
                {
                    type: 'number',
                    name: 'graphBlockRadius',
                    label: 'Block radius',
                    defaultValue: 2,
                    required: true
                }
            ]
        }
    ]
}