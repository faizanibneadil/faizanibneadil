import { resume_fields } from "@/constants";
import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";

export const Certifications: CollectionConfig<'certifications'> = {
    slug: 'certifications',
    admin: {useAsTitle: 'title'},
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [TitleField()]
}