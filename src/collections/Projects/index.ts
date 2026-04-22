import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { Iconify } from "@/fields/iconify";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig } from "payload";

export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    labels: { plural: 'Projects', singular: 'Project' },
    trash: true,
    defaultPopulate: {
        meta: true,
        resources: true,
        tenant: true,
        skills: true,
    },
    admin: {
        useAsTitle: 'title',
        // livePreview: {
        //     url: ({ data, req }) => generatePreviewPath({
        //         collectionSlug: 'projects',
        //         req,
        //         slug: data?.slug,
        //         portfolioSlug: typeof data?.tenant === 'object' ? data?.tenant.slug : data?.tenant
        //     })
        // }
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
                    label: 'Content',
                    fields: [
                        {
                            type: 'upload',
                            name: 'thumbnail',
                            label: 'Thumbnail',
                            relationTo: 'media',
                            required: true,
                            hasMany: false,
                            admin: {
                                description: 'Provide project thumbnail.',
                            }
                        },
                        {
                            type: 'richText',
                            name: 'overview',
                            editor: lexicalEditor({
                                features({ defaultFeatures, rootFeatures, }) {
                                    return [...defaultFeatures, ...rootFeatures]
                                },
                            }),
                            label: 'Overview'
                        },
                        {
                            type: 'richText',
                            name: 'detailedOverview',
                            editor: lexicalEditor({
                                features({ defaultFeatures, rootFeatures, }) {
                                    return [...defaultFeatures, ...rootFeatures]
                                },
                            }),
                            label: 'Detailed Overview'
                        },
                        {
                            name: 'publishedAt',
                            type: 'date',
                            admin: {
                                position: 'sidebar',
                            },
                        },
                        {
                            type: 'relationship',
                            name: 'skills',
                            relationTo: 'skills',
                            hasMany: true,
                            admin: {
                                description: 'Provide list of skills. You used to build this project',
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
                                            label: 'TO'
                                        },
                                        {
                                            type: 'date',
                                            name: 'from',
                                            label: 'FROM'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'group',
                            name: 'credential',
                            label: 'Credential',
                            admin: {
                                description: 'Provide credential for testing.',
                                condition: (field, siblings, ctx) => {
                                    return typeof ctx?.user?.industry === 'object' ? ctx?.user?.industry?.slug === 'game-development' || ctx?.user?.industry?.slug === 'data-scienceanalytics' || ctx?.user?.industry?.slug === 'web-and-software-development' : false
                                }
                            },
                            fields: [
                                { type: 'email', name: 'credential_email', label: 'Email' },
                                { type: 'text', name: 'credential_password', label: 'Password' },
                                {
                                    type: 'text',
                                    name: 'credential_username',
                                    label: 'Username',
                                    admin: {
                                        description: 'If you handled your authentication with username then provide otherwize leave it.'
                                    }
                                }
                            ]
                        },
                        {
                            type: 'array',
                            name: 'resources',
                            labels: { singular: 'Link', plural: 'Links' },
                            admin: {
                                initCollapsed: true
                            },
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'type',
                                            type: 'radio',
                                            admin: {
                                                layout: 'horizontal',
                                                width: '50%',
                                            },
                                            defaultValue: 'internal',
                                            options: [
                                                {
                                                    label: 'Internal link',
                                                    value: 'internal',
                                                },
                                                {
                                                    label: 'External URL',
                                                    value: 'external',
                                                },
                                            ],
                                        },
                                        {
                                            name: 'newTab',
                                            type: 'checkbox',
                                            admin: {
                                                style: {
                                                    alignSelf: 'flex-end',
                                                },
                                                width: '50%',
                                            },
                                            label: 'Open in new tab',
                                        },
                                    ],
                                },
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            type: 'relationship',
                                            relationTo: ['pages'],
                                            name: 'page',
                                            label: 'Page',
                                            admin: {
                                                condition: (_, { type }) => type === 'internal',
                                                width: '50%'
                                            }
                                        },
                                        {
                                            type: 'text',
                                            name: 'url',
                                            label: 'URL',
                                            validate: (url: string | undefined | null) => {
                                                try {
                                                    if (!url) {
                                                        return 'URL is required.'
                                                    }
                                                    new URL(url)
                                                    return true
                                                } catch (error) {
                                                    return 'Invalid URL'
                                                }
                                            },
                                            admin: {
                                                condition: (_, { type }) => type === 'external',
                                                width: '50%'
                                            }
                                        },
                                        {
                                            type: 'text',
                                            name: 'label',
                                            label: 'Label',
                                            admin: {
                                                width: '50%'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
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
        slugField({
            name: 'slug',
            checkboxName: 'lockSlug',
            slugify: ({ valueToSlugify, data }) => {
                const fieldToSlug = slugify(valueToSlugify)

                if (!fieldToSlug) {
                    return undefined
                }

                return `${fieldToSlug}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
            },
        }),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    versions: {
        drafts: {
            autosave: true,
        },
        maxPerDoc: 50,
    },
}