import type { CollectionConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
// import { NavigationGroups } from "@/constants";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { Iconify } from "@/fields/iconify";
// import { VersionConfig } from "@/utilities/version-config";

export const Menus: CollectionConfig<'menus'> = {
    slug: 'menus',
    labels: { plural: 'Menus', singular: 'Menu' },
    admin: {
        // group: NavigationGroups.portfolio 
    },
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
                            filterOptions: ({ siblingData, data }) => {
                                const siblings: any = siblingData
                                const currentResourceId = typeof siblings?.page === 'object'
                                    ? siblings?.page?.id
                                    : siblings?.page;

                                const otherSelectedPageIds = data?.menu
                                    ?.map((item: any) => {
                                        return typeof item.page === 'object' ? item.page.id : item.page
                                    })
                                    .filter((id: any) => {
                                        return id !== currentResourceId
                                    })
                                    .filter(Boolean) || [];

                                if (otherSelectedPageIds.length === 0) {
                                    return true
                                }

                                return {
                                    id: {
                                        not_in: otherSelectedPageIds,
                                    },
                                }
                            }
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
    // versions: VersionConfig(),
}