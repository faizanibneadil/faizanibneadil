import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { Iconify } from "@/fields/iconify";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig } from "payload";

export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    labels: { plural: 'Projects', singular: 'Project' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
        preview: generatePreview({ collection: 'projects' })
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
                            name: 'Skills',
                            relationTo: 'skills',
                            hasMany: true,
                            admin: {
                                description: 'Provide list of skills. You used to build this project',
                                // appearance: 'drawer'
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
            slugify: ({ valueToSlugify }) => {
                const slug = slugify(valueToSlugify)
                return `${slug}-${Date.now()}`
            },
        }),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    // versions: VersionConfig(),
}