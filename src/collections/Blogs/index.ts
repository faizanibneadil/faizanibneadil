import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";

export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    admin: {
        useAsTitle: 'title',
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
            name: 'title',
            label: 'Title',
            required: true
        },
        {
            type: 'richText',
            name: 'content',
            label: false,
            editor: lexicalEditor()
        }
    ]
}