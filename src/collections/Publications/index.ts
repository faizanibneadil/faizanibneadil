import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { NavigationGroups } from "@/constants";

export const Publications: CollectionConfig<'publications'> = {
    slug: 'publications',
    admin: { useAsTitle: 'title', group:NavigationGroups.portfolio },
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
            admin: {
                initCollapsed: true
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type:'relationship',
                            relationTo: 'icons',
                            name: 'icon',
                            label: 'Icon',
                            required: true,
                            hasMany: false,
                            admin:{
                                appearance: 'drawer',
                                allowCreate: false,
                                allowEdit: false,
                            }
                        },
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
            admin: {
                appearance: 'drawer',
                position: 'sidebar'
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