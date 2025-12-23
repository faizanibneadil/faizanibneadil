import { Block } from "payload";

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
    slug: 'formBlock',
    interfaceName: 'TFormBlockProps',
    labels: { plural: 'Forms', singular: 'Form' },
    fields: [
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
        },
        {
            name: 'enableIntro',
            type: 'checkbox',
            label: 'Enable Intro Content',
        },
        {
            name: 'introContent',
            type: 'richText',
            admin: {
                condition: (_, { enableIntro }) => Boolean(enableIntro),
            },
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                    return [
                        ...defaultFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ]
                },
            }),
            label: 'Intro Content',
        },
    ],
}