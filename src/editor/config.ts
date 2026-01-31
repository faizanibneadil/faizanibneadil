import {
    BlockquoteFeature,
    FixedToolbarFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    LinkFeature,
    UploadFeature,
    lexicalEditor
} from '@payloadcms/richtext-lexical'


export const editorConfig = lexicalEditor({
    features({ defaultFeatures, rootFeatures }) {
        return [
            ...defaultFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UploadFeature({ enabledCollections: ['media'] }),
            BlockquoteFeature(),
            HorizontalRuleFeature(),
            LinkFeature({
                fields: ({ defaultFields }) => [
                    ...defaultFields,
                    {
                        name: 'rel',
                        type: 'select',
                        options: ['noopener', 'noreferrer', 'nofollow'],
                    },
                ],
                enabledCollections: [
                    'pages',
                    'achievements',
                    'blogs',
                    'certifications',
                    'educations',
                    'hackathons',
                    'licenses',
                    'media',
                    'publications',
                    'researches',
                ], // Collections for internal links
                maxDepth: 2, // Population depth for internal links
                disableAutoLinks: 'creationOnly', // Allow auto-conversion of URLs
            })
        ]
    },
})