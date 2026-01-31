import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { Iconify } from "@/fields/iconify";

export const Menus: CollectionConfig<'menus'> = {
    slug: 'menus',
    labels: { plural: 'Menus', singular: 'Menu' },
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
                Iconify(),
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            type: 'relationship',
                            relationTo: 'pages',
                            name: 'page',
                            label: 'Page',
                            admin: {
                                width: '50%'
                            },
                        }
                    ]
                }
            ]
        },
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
}