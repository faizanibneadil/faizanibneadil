import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { slugify } from "@/utilities/slugify";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { type CollectionConfig, slugField } from "payload";

export const Industries: CollectionConfig<'industries'> = {
    slug: 'industries',
    labels: { plural: 'Industries', singular: 'Industry' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
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
        slugField({
            name: 'slug',
            checkboxName: 'lockSlug',
            slugify: ({ valueToSlugify }) => {
                return slugify(valueToSlugify)
            },
        }),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}