import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { Iconify } from "@/fields/iconify";
import {
    RevalidatePageAfterChange,
    RevalidatePageAfterDelete
} from "@/hooks/RevalidatePage";
// import { VersionConfig } from "@/utilities/version-config";
import type { CollectionConfig } from "payload";

export const Socials: CollectionConfig<'socials'> = {
    slug: 'socials',
    labels: { plural: 'Socials', singular: 'Social' },
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
            name: 'socialsLinks',
            labels: { plural: 'Socials Links', singular: 'Social Link' },
            maxRows: 4,
            fields: [
                Iconify(),
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'title',
                            label: 'Title',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            type: 'text',
                            name: 'link',
                            label: 'Link',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
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