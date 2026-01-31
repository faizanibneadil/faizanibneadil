import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Certifications: CollectionConfig<'certifications'> = {
    slug: 'certifications',
    labels: { plural: 'Certifications', singular: 'Certificate' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        preview: generatePreview({ collection: 'certifications' }),
        defaultColumns: ['title', 'issuer', 'isLifetime', 'createdAt'],
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
                    name: 'content',
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
                                            name: 'label', 
                                            type: 'text', 
                                            label: 'Label', 
                                            required: true, 
                                            admin: { width: '40%', placeholder: 'e.g., Verify Credential' } 
                                        },
                                        { 
                                            name: 'link', 
                                            type: 'text', 
                                            label: 'URL', 
                                            required: true, 
                                            admin: { width: '60%', placeholder: 'https://...' } 
                                        }
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