import type { CollectionConfig, GlobalConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { IconField } from "@/fields/icon";

export const Socials: CollectionConfig<'socials'> = {
    slug: 'socials',
    admin:{ group: NavigationGroups.portfolio},
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
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'title',
                            label: 'Title',
                            required: true
                        },
                        {
                            type: 'text',
                            name: 'link',
                            label: 'Link',
                            required: true
                        },
                        IconField()
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