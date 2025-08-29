import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
// import { VersionConfig } from "@/utilities/version-config";

export const Notes: CollectionConfig<'notes'> = {
    slug: 'notes',
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
            editor: lexicalEditor(),
            name: 'content',
            label: 'Note Content'
        },
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}