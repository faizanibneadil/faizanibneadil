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
    defaultPopulate: {
        createdAt: true,
        menu: true,
        tenant: true
    },
    fields: [
        {
            type: 'array',
            name: 'menu',
            label: 'Menu',
            interfaceName: 'TMenuItemsPropsType',
            maxRows: 4,
            fields: [
                Iconify(),
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'type',
                            type: 'radio',
                            admin: {
                                layout: 'horizontal',
                                width: '50%',
                            },
                            defaultValue: 'internal',
                            options: [
                                {
                                    label: 'Internal link',
                                    value: 'internal',
                                },
                                {
                                    label: 'External URL',
                                    value: 'external',
                                },
                            ],
                        },
                        {
                            name: 'newTab',
                            type: 'checkbox',
                            admin: {
                                style: {
                                    alignSelf: 'flex-end',
                                },
                                width: '50%',
                            },
                            label: 'Open in new tab',
                        },
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'relationship',
                            relationTo: ['pages'],
                            name: 'page',
                            label: 'Page',
                            admin: {
                                condition: (_, { type }) => type === 'internal',
                                width: '50%'
                            }
                        },
                        {
                            type: 'text',
                            name: 'url',
                            label: 'URL',
                            validate: (url: string | undefined | null) => {
                                try {
                                    if (!url) {
                                        return 'URL is required.'
                                    }
                                    new URL(url)
                                    return true
                                } catch (error) {
                                    return 'Invalid URL'
                                }
                            },
                            admin: {
                                condition: (_, { type }) => type === 'external',
                                width: '50%'
                            }
                        },
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label',
                            admin: {
                                width: '50%'
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
}