import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { NavigationGroups } from "@/constants";

export const Educations: CollectionConfig<'educations'> = {
    slug: 'educations',
    admin: { useAsTitle: 'title', group: NavigationGroups.resume },
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
            label: 'Description',
            editor: lexicalEditor()
        },
        {
            type: 'group',
            name: 'qualification',
            label: 'Qualification',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            label: 'Academy',
                            name: 'academy',
                        },
                        {
                            type: 'text',
                            label: 'Degree',
                            name: 'degree',
                        }
                    ]
                }
            ]
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