import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig } from "payload";

export const Researches: CollectionConfig<'researches'> = {
    slug: 'researches',
    labels: { plural: 'Researches', singular: 'Research' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'dates_from', 'createdAt'],
        hidden: ({ user }) => {
            // Your existing logic
            return isSuperAdmin(user) ? false : user?.industry?.slug === 'digital-artist'
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
                    label: 'Content',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'status',
                                    type: 'select',
                                    label: 'Research Status',
                                    required: true,
                                    options: [
                                        { label: 'Ongoing', value: 'ongoing' },
                                        { label: 'Completed', value: 'completed' },
                                        { label: 'On Hold', value: 'on_hold' },
                                        { label: 'Under Review', value: 'under_review' },
                                    ],
                                    admin: { width: '50%', description: 'Current progress of the research.' }
                                },
                                {
                                    name: 'role',
                                    type: 'text',
                                    label: 'Your Role',
                                    admin: {
                                        width: '50%',
                                        placeholder: 'e.g., Lead Researcher, Assistant, etc.',
                                        description: 'State your position in this study.'
                                    }
                                },
                            ]
                        },
                        {
                            type: 'upload',
                            relationTo: 'media',
                            name: 'image',
                            label: 'Key Visual / Poster',
                            required: true,
                            admin: {
                                position: 'sidebar',
                                description: 'An image representing the research or the project poster.'
                            }
                        },
                        {
                            type: 'richText',
                            name: 'description',
                            label: 'Research Abstract & methodology',
                            editor: lexicalEditor(),
                            admin: {
                                description: 'Detail your hypothesis, research methodology, and findings.'
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
                            label: 'Timeline & Venue',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'from',
                                            type: 'date',
                                            label: 'Start Date',
                                            required: true,
                                            admin: { width: '33.33%' }
                                        },
                                        {
                                            name: 'to',
                                            type: 'date',
                                            label: 'End Date',
                                            admin: {
                                                width: '33.33%',
                                                condition: (data) => data?.content?.status !== 'ongoing'
                                            }
                                        },
                                        {
                                            name: 'location',
                                            type: 'text',
                                            label: 'Institution / Lab',
                                            admin: {
                                                width: '33.33%',
                                                placeholder: 'e.g., MIT Lab, Remote Research'
                                            }
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'array',
                            name: 'resources',
                            label: 'Resources',
                            labels: { singular: 'Resource', plural: 'Resources' },
                            admin: {
                                description: 'Links to dataset, methodology papers, or whitepapers.'
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
    versions: {
        drafts: {
            autosave: true,
        },
        maxPerDoc: 50,
    },
}