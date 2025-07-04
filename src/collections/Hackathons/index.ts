import { resume_fields } from "@/constants";
import { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";

export const Hackathons: CollectionConfig<'hackathons'> = {
    slug: 'hackathons',
    admin: {
        useAsTitle: 'title',
        hidden: ({ user }) => user?.field !== resume_fields.information_technology
    },
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [TitleField()]
}