import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
// import { NavigationGroups } from "@/constants";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
// import { Blog } from "@/payload-types";
import { generatePreview } from "@/utilities/generate-preview";
// import { getServerSideURL } from "@/utilities/getURL";
// import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
// import { VersionConfig } from "@/utilities/version-config";
import { BlocksFeature, CodeBlock, LinkFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
// import { headers as getHeaders } from "next/headers";
import type { CollectionConfig } from "payload";


export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
        preview: generatePreview({ collection: 'blogs' })
    },
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [
        TitleField(),
        {
            type: 'richText',
            name: 'content',
            label: false,
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [
                        ...rootFeatures,
                        LinkFeature({
                            maxDepth: 5,
                            enabledCollections: ['blogs', 'pages'],
                            fields: ({ config, defaultFields }) => [
                                ...defaultFields,
                                {
                                    type: 'select',
                                    name: 'linkStyle',
                                    defaultValue: 'normal',
                                    options: [
                                        { label: 'normal', value: 'normal' },
                                        { label: 'Glimpse Style Preview', value: 'GlimpseStyle' }
                                    ],
                                    required: true
                                },
                                {
                                    name: 'rel',
                                    label: 'Rel Attribute',
                                    type: 'select',
                                    hasMany: true,
                                    options: ['noopener', 'noreferrer', 'nofollow'],
                                    admin: {
                                        description:
                                            'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                                    },
                                },
                            ]
                        }),
                        BlocksFeature({
                            blocks: [
                                'formBlock',
                                'project',
                                CodeBlock({
                                    slug: 'PayloadCode',
                                    defaultLanguage: 'js',
                                    languages: {
                                        ts: 'TypeScript',
                                        js: 'JavaScript'
                                    },
                                    typescript: {
                                        fetchTypes: [
                                            {
                                                // The index.bundled.d.ts contains all the types for Payload in one file, so that Monaco doesn't need to fetch multiple files.
                                                // This file may be removed in the future and is not guaranteed to be available in future versions of Payload.
                                                url: 'https://unpkg.com/payload@3.59.0-internal.8435f3c/dist/index.bundled.d.ts',
                                                filePath: 'file:///node_modules/payload/index.d.ts',
                                            },
                                            {
                                                url: 'https://unpkg.com/@types/react@19.1.17/index.d.ts',
                                                filePath: 'file:///node_modules/@types/react/index.d.ts',
                                            },
                                        ],
                                        paths: {
                                            payload: ['file:///node_modules/payload/index.d.ts'],
                                            react: ['file:///node_modules/@types/react/index.d.ts'],
                                        },
                                        typeRoots: ['node_modules/@types', 'node_modules/payload'],
                                        // Enable type checking. By default, only syntax checking is enabled.
                                        enableSemanticValidation: true,
                                    },
                                }),
                            ],
                        }),
                    ]
                },
            })
        },
        {
            type: 'richText',
            name: 'description',
            label: false,
            admin: {
                description: 'Blog short description.'
            },
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...defaultFeatures, ...rootFeatures]
                },
            })
        },
        {
            type: 'upload',
            name: 'featured_image',
            label: 'Featured Image',
            relationTo: 'media',
            hasMany: false,
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}