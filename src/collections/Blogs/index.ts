import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { RichTextLinkFeature } from "@/utilities/RichTextLinkFeature";
import { generatePreview } from "@/utilities/generate-preview";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig } from "payload";


export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    labels: { plural: 'Blogs', singular: 'Blog' },
    trash: true,
    admin: {
        custom: {
            enableCollectionView:true
        },
        useAsTitle: 'title',
        // livePreview: {
        //     url: ({ data, req }) => generatePreviewPath({
        //         collectionSlug: 'blogs',
        //         req,
        //         slug: data?.slug,
        //         portfolioSlug: typeof data?.tenant === 'object' ? data?.tenant.slug : data?.tenant
        //     })
        // }
    },
    defaultPopulate: {
        meta: true,
        categories: true,
        _status: true,
        content: true,
        createdAt: true,
        deletedAt: true,
        description: true,
        featured_image: true,
        resources: true,
        slug: true,
        tenant: true,
        title: true,
        updatedAt: true
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
                            type: 'richText',
                            name: 'content',
                            label: false,
                            editor: lexicalEditor({
                                features({ defaultFeatures, rootFeatures, }) {
                                    return [
                                        ...rootFeatures,
                                        RichTextLinkFeature(),
                                        BlocksFeature({
                                            blocks: ['formBlock', 'project', 'code-block'],
                                            inlineBlocks: ['linkBadge', 'glimpseLink']
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
                            // required: true,
                            admin: {
                                position: 'sidebar'
                            },
                        },
                        {
                            type: 'array',
                            name: 'resources',
                            labels: { singular: 'External Link', plural: 'External Links' },
                            admin: {
                                description: 'Add relevant links to verify this achievement (e.g., News articles, YouTube, or Event sites).'
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
        {
            type: 'relationship',
            relationTo: 'categories',
            name: 'categories',
            hasMany: true,
            admin: {
                position: 'sidebar'
            }
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
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    versions: {
        drafts: {
            autosave: true,
        },
        maxPerDoc: 50,
    },
}