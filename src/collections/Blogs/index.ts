import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";


export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    trash: true,
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
                position: 'sidebar'
            }
        },
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    versions: VersionConfig(),
}