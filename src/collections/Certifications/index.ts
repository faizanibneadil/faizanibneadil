import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig } from "payload";

export const Certifications: CollectionConfig<'certifications'> = {
    slug: 'certifications',
    labels: { plural: 'Certifications', singular: 'Certificate' },
    trash: true,
    admin: {
        custom: {
            enableCollectionView:true
        },
        useAsTitle: 'title',
        // livePreview: {
        //     url: ({ data, req }) => generatePreviewPath({
        //         collectionSlug: 'certifications',
        //         req,
        //         slug: data?.slug,
        //         portfolioSlug: typeof data?.tenant === 'object' ? data?.tenant.slug : data?.tenant
        //     })
        // },
        defaultColumns: ['title', 'issuer', 'isLifetime', 'createdAt'],
    },
    defaultPopulate: {
        meta: true,
        resources: true,
        skills: true,
        slug: true,
        tenant: true,
        _status: true,
        createdAt: true,
        credentialId: true,
        description: true,
        image: true,
        issuer: true,
        title: true,
        validity: true
    },
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [
        TitleField(), // The official name of the certification.
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
                                    name: 'issuer',
                                    type: 'text',
                                    label: 'Issuing Organization',
                                    required: true,
                                    admin: {
                                        width: '50%',
                                        description: 'The entity that granted this credential (e.g., Cisco, Yale, PMI).'
                                    }
                                },
                                {
                                    name: 'credentialId',
                                    type: 'text',
                                    label: 'Credential ID',
                                    admin: {
                                        width: '50%',
                                        description: 'Unique identifier provided by the issuer for verification.'
                                    }
                                },
                            ]
                        },
                        {
                            type: 'upload',
                            relationTo: 'media',
                            name: 'image',
                            label: 'Certificate Badge / Logo',
                            required: true,
                            admin: {
                                position: 'sidebar',
                                description: 'Upload a high-resolution logo of the issuer or the official certification badge.'
                            }
                        },
                        {
                            type: 'richText',
                            name: 'description',
                            label: 'Certification Details',
                            editor: lexicalEditor(),
                            admin: {
                                description: 'Detail the curriculum, skills mastered, or the exam passed to earn this certificate.'
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
                            name: 'validity',
                            label: 'Validity & Timeline',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'issuedDate',
                                            type: 'date',
                                            label: 'Issue Date',
                                            required: true,
                                            admin: {
                                                width: '33.33%',
                                                description: 'Date when the credential was granted.'
                                            }
                                        },
                                        {
                                            name: 'expiryDate',
                                            type: 'date',
                                            label: 'Expiry Date',
                                            admin: {
                                                width: '33.33%',
                                                description: 'Date when the credential expires.',
                                                condition: (data) => !data?.content?.validity?.isLifetime
                                            }
                                        },
                                        {
                                            name: 'isLifetime',
                                            type: 'checkbox',
                                            label: 'No Expiration',
                                            defaultValue: false,
                                            admin: {
                                                width: '33.33%',
                                                style: { marginTop: '35px' },
                                                description: 'Check if this certification is valid indefinitely.'
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
                                description: 'Provide links to official verification portals, online badges, or PDF copies.'
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