import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

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
                    name: 'content',
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
                                        { name: 'label', type: 'text', label: 'Label', required: true, admin: { placeholder: 'e.g., View Dataset' } },
                                        { name: 'link', type: 'text', label: 'URL', required: true, admin: { placeholder: 'https://...' } }
                                    ]
                                }
                            ],
                            maxRows: 4
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
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
}