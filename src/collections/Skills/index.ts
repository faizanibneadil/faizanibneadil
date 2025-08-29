import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { IconField } from "@/fields/icon";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
// import { VersionConfig } from "@/utilities/version-config";
import type { CollectionConfig } from "payload";

export const Skills: CollectionConfig<'skills'> = {
    slug: 'skills',
    trash: true,
    admin: {
        useAsTitle: 'title',
        group: NavigationGroups.resume,
        defaultColumns: ['title', 'slug', 'techstack.icon']
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
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        }, {
            type: 'group',
            name: 'techstack',
            label: 'Tech Stack',
            admin: { description: 'If you want to show an icon of the skill instead of skill as name then you have to select an icon from icons collection. REMEMBER: If the icon is available on skill only icon will be display.' },
            fields: [IconField({
                required:false,
                admin: {
                    components: {
                        Cell: '@/collections/Skills/components/view-icon.tsx#ViewIcon'
                    }
                }
            })]
        }, {
            type: 'relationship',
            name: 'projects',
            relationTo: 'projects',
            hasMany: true,
            admin: {
                description: 'Select those project in whitch you used this skill.',
                appearance: 'drawer'
            }
        },
        ...slugField()
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    // versions: VersionConfig(),
}