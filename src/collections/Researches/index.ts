import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
// import { NavigationGroups } from "@/constants";
import { Iconify } from "@/fields/iconify";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
// import { VersionConfig } from "@/utilities/version-config";
import { BlocksFeature, CodeBlock, lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Researches: CollectionConfig<'researches'> = {
    slug: 'researches',
    labels: { plural: 'Researches', singular: 'Research' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
        preview: generatePreview({ collection: 'researches' }),
        hidden: ({ user }) => {
            return isSuperAdmin(user) ? false : user?.industry.slug === 'digital-artist'
        },
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
            type: 'tabs',
            tabs: [
                {
                    name: 'content',
                    label: 'Content',
                    fields: [
                        {
                            type: 'richText',
                            name: 'description',
                            label: false,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        BlocksFeature({
                                            blocks: [
                                                'formBlock',
                                                'project',
                                                CodeBlock({
                                                    slug: 'PayloadCode',
                                                    languages: {
                                                        ts: 'TypeScript',
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
                                }
                            }),
                            admin: {
                                description: 'Write description.'
                            }
                        },
                        {
                            type: 'group',
                            name: 'dates',
                            label: 'Dates',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            type: 'date',
                                            name: 'to',
                                            label: 'TO',
                                            required: true
                                        },
                                        {
                                            type: 'date',
                                            name: 'from',
                                            label: 'FROM',
                                            required: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'text',
                            name: 'location',
                            label: 'Location'
                        },
                        {
                            type: 'array',
                            name: 'links',
                            labels: { singular: 'Link', plural: 'Links' },
                            admin: {
                                initCollapsed: true
                            },
                            fields: [
                                Iconify(),
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            type: 'text',
                                            label: 'Lable',
                                            name: 'label',
                                            required: true,
                                            admin: {
                                                width: '50%'
                                            }
                                        },
                                        {
                                            type: 'text',
                                            name: 'link',
                                            label: 'Link',
                                            required: true,
                                            admin: {
                                                width: '50%'
                                            }
                                        }
                                    ]
                                }
                            ],
                            maxRows: 5
                        },
                        {
                            type: 'upload',
                            relationTo: 'media',
                            name: 'image',
                            label: 'Avatar',
                            required: true,
                            hasMany: false,
                            admin: {
                                position: 'sidebar'
                            },
                        }
                    ]
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        MetaTitleField({
                            // if the `generateTitle` function is configured
                            hasGenerateFn: true,
                        }),
                        MetaDescriptionField({
                            // if the `generateDescription` function is configured
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            // the upload collection slug
                            relationTo: 'media',

                            // if the `generateImage` function is configured
                            hasGenerateFn: true,
                        }),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                        OverviewField({
                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        })
                    ]
                }
            ]
        },
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}