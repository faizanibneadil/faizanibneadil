import { resume_fields } from "@/constants";
import { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { iconField } from "@/fields/icon";

export const Hackathons: CollectionConfig<'hackathons'> = {
    slug: 'hackathons',
    admin: {
        useAsTitle: 'title',
        hidden: ({ user }) => user ? user?.field !== resume_fields.information_technology : false
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
            type: 'richText',
            name: 'description',
            label: false,
            editor: lexicalEditor(),
            admin: {
                description: 'Write description.'
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
            name: 'links',
            labels: { singular: 'Link', plural: 'Links' },
            admin:{
                initCollapsed:true
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        iconField,
                        {
                            type: 'text',
                            label: 'Lable',
                            name: 'label',
                            required: true
                        },
                        {
                            type: 'text',
                            name: 'link',
                            label: 'Link',
                            required: true
                        }
                    ]
                }
            ],
            maxRows: 5
        },
        {
            type: 'relationship',
            relationTo: 'media',
            name: 'image',
            label: 'Avatar',
            required: true,
            hasMany: false,
            admin:{
                appearance:'drawer',
                position:'sidebar'
            }
        }
    ],
    versions: {
        drafts: {
            autosave: {
                interval: 30000,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}