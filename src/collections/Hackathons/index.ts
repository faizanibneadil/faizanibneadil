import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { Iconify } from "@/fields/iconify";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
// import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig, slugField } from "payload";

export const Hackathons: CollectionConfig<'hackathons'> = {
    slug: 'hackathons',
    labels: { plural: 'Hackathons', singular: 'Hackathon' },
    trash: true,
    defaultPopulate: {
        resources: true,
        skills: true,
        tenant: true,
        _status: true,
        createdAt: true,
        dates: true,
        description: true,
        image: true,
        location: true,
        meta: true,
        slug: true,
        title: true
    },
    admin: {
        useAsTitle: 'title',
        // livePreview: {
        //     url: ({ data, req }) => generatePreviewPath({
        //         collectionSlug: 'hackathons',
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
                    fields: [{
                        type: 'richText',
                        name: 'description',
                        label: false,
                        editor: lexicalEditor(),
                        admin: {
                            description: 'Write description.'
                        }
                    },
                    {
                        type: 'relationship',
                        relationTo: 'skills',
                        name: 'skills',
                        label: 'Skills',
                        hasMany: true
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
                        name: 'resources',
                        label: 'Resources',
                        labels: { singular: 'Resource', plural: 'Resources' },
                        admin: {
                            description: 'Add links to your thesis, university profile, or digital degree copy.'
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
                    {
                        type: 'upload',
                        relationTo: 'media',
                        name: 'image',
                        label: 'Avatar',
                        required: true,
                        hasMany: false,
                        admin: {
                            position: 'sidebar'
                        }
                    }]
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
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    versions: {
        drafts: {
            autosave: true,
        },
        maxPerDoc: 50,
    },
}