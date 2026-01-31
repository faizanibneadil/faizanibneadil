import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Licenses: CollectionConfig<'licenses'> = {
    slug: 'licenses',
    labels: { plural: 'Licenses', singular: 'License' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'issuingAuthority', 'licenseNumber', 'status'],
        hidden: ({ user }) => {
            if (isSuperAdmin(user)) return false;
            // Sirf healthcare ya relevant industries ke liye show hoga
            return user?.industry?.slug !== 'healthcare';
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
            type: 'row',
            fields: [
                {
                    name: 'issuingAuthority',
                    type: 'text',
                    label: 'Issuing Authority / Board',
                    required: true,
                    admin: {
                        width: '50%',
                        description: 'e.g., Pakistan Medical Commission, State Bar, etc.'
                    }
                },
                {
                    name: 'licenseNumber',
                    type: 'text',
                    label: 'License / Registration Number',
                    required: true,
                    admin: {
                        width: '50%',
                        description: 'The official unique ID of your license.'
                    }
                },
            ]
        },
        {
            type: 'upload',
            relationTo: 'media',
            name: 'image',
            label: 'Official Seal / Logo',
            required: true,
            admin: {
                description: 'Upload the logo of the issuing board or a scan of the license.'
            }
        },
        {
            type: 'richText',
            name: 'description',
            label: 'Scope of Practice',
            editor: lexicalEditor(),
            admin: {
                description: 'Briefly describe the professional activities this license permits.'
            }
        },
        {
            type: 'group',
            name: 'validity',
            label: 'Validity Details',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'issuedDate',
                            type: 'date',
                            label: 'Issue Date',
                            required: true,
                            admin: { width: '33.33%' }
                        },
                        {
                            name: 'expiryDate',
                            type: 'date',
                            label: 'Expiry Date',
                            required: true, // Licenses usually always have an expiry
                            admin: { width: '33.33%' }
                        },
                        {
                            name: 'status',
                            type: 'select',
                            label: 'Status',
                            defaultValue: 'active',
                            options: [
                                { label: 'Active', value: 'active' },
                                { label: 'Expired', value: 'expired' },
                                { label: 'Under Renewal', value: 'renewal' },
                                { label: 'Inactive', value: 'inactive' },
                            ],
                            admin: { width: '33.33%' }
                        },
                    ]
                }
            ]
        },
        {
            type: 'text',
            name: 'location',
            label: 'Jurisdiction / Region',
            admin: {
                placeholder: 'e.g., Sindh, Pakistan or New York, USA'
            }
        },
        {
            type: 'array',
            name: 'resources',
            label: 'Resources',
            labels: { singular: 'Resource', plural: 'Resources' },
            admin: {
                description: 'Links to online registries or downloadable license copies.'
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        { name: 'label', type: 'text', label: 'Label', required: true, admin: { placeholder: 'e.g., Verify on PMC Portal' } },
                        { name: 'link', type: 'text', label: 'Link', required: true, admin: { placeholder: 'https://...' } }
                    ]
                }
            ],
            maxRows: 3
        },
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
}