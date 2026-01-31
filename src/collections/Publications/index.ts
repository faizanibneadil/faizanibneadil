import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Publications: CollectionConfig<'publications'> = {
    slug: 'publications',
    labels: { plural: 'Publications', singular: 'Publication' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'publisher', 'publishedDate', 'type'],
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
                                        { name: 'label', type: 'text', label: 'Label', required: true, admin: { placeholder: 'e.g., Read on IEEE Xplore' } },
                                        { name: 'link', type: 'text', label: 'URL', required: true, admin: { placeholder: 'https://...' } }
                                    ]
                                }
                            ],
                            maxRows: 3
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