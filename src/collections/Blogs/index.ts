import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { NavigationGroups } from "@/constants";


export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
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
            name: 'content',
            label: false,
            editor: lexicalEditor()
        },
        {
            type: 'relationship',
            name: 'featured_image',
            label: 'Featured Image',
            relationTo: 'media',
            hasMany: false,
            admin: {
                appearance: 'drawer',
                position:'sidebar'
            }
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