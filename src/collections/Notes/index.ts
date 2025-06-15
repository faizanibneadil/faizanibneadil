import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";

export const Notes: CollectionConfig<'notes'> = {
    slug: 'notes',
    admin: {
        useAsTitle: 'title'
    },
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [
        {
            type: 'text',
            label: 'Title',
            name: 'title',
            required: true
        },
        {
            type: 'richText',
            editor: lexicalEditor(),
            name: 'content',
            label: 'Note Content'
        },
    ]
}