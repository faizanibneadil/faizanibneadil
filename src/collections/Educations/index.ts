import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Educations: CollectionConfig<'educations'> = {
    slug: 'educations',
    trash: true,
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
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    versions: VersionConfig(),
}