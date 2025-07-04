import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";

export const Publications:CollectionConfig<'publications'> = {
    slug: 'publications',
    admin: {useAsTitle: 'title'},
    access: {
            create: superAdminOrTenantAdminAccess,
            delete: superAdminOrTenantAdminAccess,
            read: () => true,
            update: superAdminOrTenantAdminAccess,
        },
    fields: [TitleField()]
}