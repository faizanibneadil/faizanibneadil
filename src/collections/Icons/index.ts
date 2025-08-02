import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
// import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { isSuperAdmin } from "@/access/isSuperAdmin"
import { NavigationGroups } from "@/constants";

export const Icons: CollectionConfig<'icons'> = {
    slug: 'icons',
    admin: {
        useAsTitle: 'title',
        group: NavigationGroups.super_admin_only,
        hidden: ({ user }) => !isSuperAdmin(user)
    },
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
        read: () => true,
        update: ({ req }) => isSuperAdmin(req.user),
    },
    fields: [
        TitleField(),
        {
            type: 'group',
            name: 'iconSpecs',
            label: 'Icon Spesifications',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'radio',
                            name: 'type',
                            required: true,
                            defaultValue: 'svg',
                            options: [
                                { label: 'Upload SVG File', value: 'svg' },
                                { label: 'SVG Code', value: 'html' }
                            ]
                        }
                    ]
                },
                {
                    type: 'code',
                    name: 'iconCode',
                    label: 'Icon code',
                    admin: {
                        condition: (fields, siblings) => fields?.iconSpecs?.type === 'html'
                    }
                },
                {
                    type: 'relationship',
                    name: 'svg',
                    relationTo: 'media',
                    admin: {
                        condition: (blocks, siblings) => blocks?.iconSpecs?.type === 'svg'
                    }
                }
            ]
        },
        ...slugField()
    ]
}