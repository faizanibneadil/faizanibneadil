import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
// import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig<'categories'> = {
    slug: 'categories',
    trash: true,
    admin: {
        useAsTitle: 'title',
        group: NavigationGroups.portfolio,
        hidden: ({ user }) => !isSuperAdmin(user),
        defaultColumns: ['title', 'slug']
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
            name: 'description',
            label: false,
            editor: lexicalEditor(),
            admin: {
                description: 'Write description.'
            }
        },
        ...slugField()
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}