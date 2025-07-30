import type { CollectionConfig, GlobalConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";

export const Menus: CollectionConfig<'menus'> = {
    slug: 'menus',
     access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [
        {
            type: 'array',
            name: 'menu',
            label: 'Menu',
            maxRows: 4,
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
                            }
                        },
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label',
                            required: true
                        },
                        {
                            type: 'relationship',
                            relationTo: 'pages',
                            name: 'page',
                            label: 'Page',
                        }
                    ]
                }
            ]
        },
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