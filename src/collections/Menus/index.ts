import type { CollectionConfig, GlobalConfig } from "payload";
import { iconField } from "@/fields/icon";

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
                        iconField,
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