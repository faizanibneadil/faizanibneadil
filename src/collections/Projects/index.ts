import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups, resume_fields } from "@/constants";
import { IconField } from "@/fields/icon";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    trash: true,
    admin: { useAsTitle: 'title', group: NavigationGroups.portfolio },
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
            relationTo: 'skills',
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
            admin: {
                description: 'Provide credential for testing.',
                condition: (field, siblings, ctx) => {
                    return ctx?.user?.field === resume_fields.information_technology
                }
            },
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
                        IconField(),
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
            required: true,
            hasMany: false,
            admin: {
                description: 'Provide project thumbnail.',
                appearance: 'drawer',
                position: 'sidebar'
            }
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    versions: {
        drafts: {
            autosave: {
                interval: 375,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}