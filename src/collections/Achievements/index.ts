import { CollectionConfig, slugField } from "payload";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { Iconify } from "@/fields/iconify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { slugify } from "@/utilities/slugify";

export const Achievements: CollectionConfig<'achievements'> = {
    slug: 'achievements',
    labels: { plural: 'Achievements', singular: 'Achievement' },
    admin: {
        useAsTitle: 'title',
        preview: generatePreview({ collection: 'achievements' }),
        defaultColumns: ['title', 'type', 'createdAt'],
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
                            name: 'type',
                            type: 'select',
                            label: 'Achievement Type',
                            options: [
                                { label: 'Award', value: 'award' },
                                { label: 'Honor', value: 'honor' },
                                { label: 'Speaking Engagement', value: 'speaking-engagement' },
                                { label: 'Competition Winner', value: 'competition-winner' },
                                { label: 'Community Contribution', value: 'community-contribution' },
                                { label: 'Other', value: 'other' },
                            ],
                            admin: {
                                width: '50%',
                                description: 'Select the category that best classifies this recognition.'
                            }
                        },
                        {
                            type: 'upload',
                            relationTo: 'media',
                            name: 'image',
                            label: 'Main Image / Badge',
                            admin: {
                                width: '50%',
                                description: 'Upload a high-quality badge, logo, or certificate photo for visual proof.'
                            }
                        },
                        {
                            type: 'richText',
                            name: 'description',
                            label: 'Main Description',
                            editor: lexicalEditor(),
                            admin: {
                                description: 'Provide a detailed overview of the achievement and your specific role or contribution.'
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
                            label: 'Timeline & Location',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'from',
                                            type: 'date',
                                            label: 'From',
                                            admin: {
                                                width: '33.33%',
                                                description: 'Starting date or date received.'
                                            }
                                        },
                                        {
                                            name: 'to',
                                            type: 'date',
                                            label: 'To (or Received Date)',
                                            admin: {
                                                width: '33.33%',
                                                description: 'End date or leave blank if it is a single-day event.'
                                            }
                                        },
                                        {
                                            name: 'location',
                                            type: 'text',
                                            label: 'Location (e.g. Remote, NYC)',
                                            admin: {
                                                width: '33.33%',
                                                description: 'Physical venue or digital platform where the event took place.'
                                            }
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'array',
                            name: 'stats',
                            label: 'Key Impact Metrics',
                            labels: { singular: 'Stat', plural: 'Stats' },
                            admin: {
                                description: 'Quantify your success with measurable data (e.g., Rank, Growth %, or Scale).'
                            },
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        { name: 'label', type: 'text', label: 'Label', required: true, admin: { placeholder: 'e.g., Global Rank' } },
                                        { name: 'value', type: 'text', label: 'Value', required: true, admin: { placeholder: 'e.g., Top 1%' } },
                                    ]
                                }
                            ],
                            maxRows: 4
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
                        MetaTitleField({ hasGenerateFn: true }),
                        MetaDescriptionField({ hasGenerateFn: true }),
                        MetaImageField({ relationTo: 'media', hasGenerateFn: true }),
                        PreviewField({
                            hasGenerateFn: true,
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                        OverviewField({
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
                return `${fieldToSlug}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
            },
        }),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    versions: true
}