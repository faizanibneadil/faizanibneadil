import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { iconField } from "@/fields/icon";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    admin: { useAsTitle: 'title' },
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
            editor: lexicalEditor(),
            label: 'Description'
        },
        {
            type: 'text',
            name: 'visitURL',
            label: 'Visit URL',
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            type: 'relationship',
            name: 'Skills',
            relationTo:'skills',
            hasMany: true,
            admin: {
                description: 'Provide list of skills. You used to build this project',
                appearance: 'drawer'
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
                            label: 'TO'
                        },
                        {
                            type: 'date',
                            name: 'from',
                            label: 'FROM'
                        }
                    ]
                }
            ]
        },
        {
            type: 'group',
            name: 'credential',
            label: 'Credential',
            admin: { description: 'Provide credential for testing.' },
            fields: [
                { type: 'email', name: 'credential_email', label: 'Email' },
                { type: 'text', name: 'credential_password', label: 'Password' },
                {
                    type: 'text',
                    name: 'credential_username',
                    label: 'Username',
                    admin: {
                        description: 'If you handled your authentication with username then provide otherwize leave it.'
                    }
                }
            ]
        },
        {
            type: 'array',
            name: 'links',
            labels: { singular: 'Link', plural: 'Links' },
            admin: {
                initCollapsed: true
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
            name: 'thumbnail',
            label: 'Thumbnail',
            relationTo: 'media',
            hasMany: false,
            admin: {
                description: 'Provide project thumbnail.',
                appearance: 'drawer',
                position: 'sidebar'
            }
        },
        ...slugField(),
    ],
    // hooks: {
    //     afterChange: [revalidatePage],
    //     beforeChange: [populatePublishedAt],
    //     afterDelete: [revalidateDelete],
    // },
    versions: {
        drafts: {
            autosave: {
                interval: 100,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}