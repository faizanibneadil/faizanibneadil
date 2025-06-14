import type { CollectionConfig, GlobalConfig } from "payload";
import { iconField } from "@/fields/icon";

import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";

export const Menu: CollectionConfig<'menu'> = {
    slug: 'menu',
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
                            type: 'checkbox',
                            label: 'As Collection',
                            name: 'asCollection',
                            defaultValue: false,
                            admin: {
                                description: 'If it is checked then this will be a collection of docs.'
                            }
                        },
                        iconField
                    ]
                },
                {
                    type: 'row',
                    fields: [
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
    ]
}