import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { CollectionConfig } from "payload";

export const Categories:CollectionConfig<'categories'> = {
    slug: 'categories',
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    }, 
    fields: [
        TitleField(),
    ]
}