import { BlocksFeature, FixedToolbarFeature, InlineToolbarFeature, RelationshipFeature, UploadFeature, lexicalEditor } from '@payloadcms/richtext-lexical'


export const editorConfig = lexicalEditor({
    features({ defaultFeatures, rootFeatures }) {
        return [
            ...defaultFeatures,
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UploadFeature({
                enabledCollections: ['media']
            }),
            BlocksFeature({
                blocks: [
                    'about',
                    'achievement',
                    'certification',
                    'contact',
                    'education',
                    'experience',
                    'hackathon',
                    'hero',
                    'license',
                    'project',
                    'publication',
                    'research',
                    'skill',
                ],
            }),
            RelationshipFeature({
                enabledCollections: [
                    'achievements',
                    'blogs',
                    'certifications',
                    'educations',
                    'socials',
                    'skills',
                    'researches',
                    'publications',
                    'projects',
                    'pages',
                    'notes',
                    'licenses',
                ]
            })
        ]
    },
})