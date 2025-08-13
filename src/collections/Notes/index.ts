import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { NavigationGroups } from "@/constants";

export const Notes: CollectionConfig<'notes'> = {
    slug: 'notes',
    admin: {
        useAsTitle: 'title',
        group: NavigationGroups.portfolio
    },
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
            editor: lexicalEditor(),
            name: 'content',
            label: 'Note Content'
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