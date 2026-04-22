import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig } from "payload";

export const Publications: CollectionConfig<'publications'> = {
    slug: 'publications',
    labels: { plural: 'Publications', singular: 'Publication' },
    trash: true,
    defaultPopulate: {
        meta: true,
        resources: true,
        skills: true,
        tenant: true
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'publisher', 'publishedDate', 'type'],
        // livePreview: {
        //     url: ({ data, req }) => generatePreviewPath({
        //         collectionSlug: 'publications',
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
                            type: 'row',
                            fields: [
                                {
                                    name: 'type',
                                    type: 'select',
                                    label: 'Publication Type',
                                    required: true,
                                    options: [
                                        { label: 'Research Paper / Journal', value: 'research_paper' },
                                        { label: 'Book / Textbook', value: 'book' },
                                        { label: 'Conference Proceeding', value: 'conference' },
                                        { label: 'Patent', value: 'patent' },
                                        { label: 'White Paper', value: 'white_paper' },
                                    ],
                                    admin: {
                                        width: '50%',
                                        description: 'Select the formal category of this work.'
                                    }
                                },
                                {
                                    name: 'publisher',
                                    type: 'text',
                                    label: 'Publisher / Journal / Body',
                                    required: true,
                                    admin: {
                                        width: '50%',
                                        description: 'e.g., IEEE, Springer, Oxford University Press.'
                                    }
                                },
                            ]
                        },
                        {
                            type: 'upload',
                            relationTo: 'media',
                            name: 'image',
                            label: 'Cover / Thumbnail',
                            required: true,
                            admin: {
                                description: 'Upload a book cover or a preview image of the paper.'
                            }
                        },
                        {
                            type: 'richText',
                            name: 'description',
                            label: 'Abstract / Summary',
                            editor: lexicalEditor(),
                            admin: {
                                description: 'Provide a formal abstract or high-level summary of the work.'
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
                            type: 'row',
                            fields: [
                                {
                                    name: 'publishedDate',
                                    type: 'date',
                                    label: 'Publication Date',
                                    required: true,
                                    admin: { width: '50%', description: 'The official date of release or filing.' }
                                },
                                {
                                    name: 'doi',
                                    type: 'text',
                                    label: 'DOI / ISSN / Patent No.',
                                    admin: {
                                        width: '50%',
                                        description: 'Formal identification number for citation.',
                                        placeholder: 'e.g., 10.1038/nature12345'
                                    }
                                },
                            ]
                        },
                        {
                            type: 'array',
                            name: 'resources',
                            label: 'Recourses',
                            labels: { singular: 'Recurse', plural: 'Recourses' },
                            admin: {
                                description: 'Add links to the full text, library record, or digital PDF.'
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