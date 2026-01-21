import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { Iconify } from "@/fields/iconify";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { slugify } from "@/utilities/slugify";
import { slugField, type CollectionConfig } from "payload";

export const Skills: CollectionConfig<'skills'> = {
    slug: 'skills',
    labels: { plural: 'Skills', singular: 'Skill' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.resume,
        defaultColumns: ['title', 'slug', 'techstack.icon'],
        preview: generatePreview({ collection: 'skills' })
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
            // admin: { description: 'If you want to show an icon of the skill instead of skill as name then you have to select an icon from icons collection. REMEMBER: If the icon is available on skill only icon will be display.' },
            fields: [
                {
                    type: 'checkbox',
                    name: 'showIcon',
                    label: 'Display Icon instead of Text',
                    defaultValue: ({ user }) => {
                        return typeof user?.industry === 'object'
                            ? user?.industry?.slug === 'information-technology'
                            : false
                    },
                    admin: {
                        description: 'Enable this to show the technology icon on the portfolio. If disabled, only the skill name will be displayed.'
                    }
                },
                Iconify({
                    admin: {
                        condition: (data, siblingData) => siblingData?.showIcon === true,
                        description: 'Search and select an icon for this skill. Note: This icon will only be visible if "Display Icon" is enabled above.'
                    }
                })
            ]
        }, {
            type: 'relationship',
            name: 'projects',
            relationTo: 'projects',
            hasMany: true,
            admin: {
                description: 'Select those project in which you used this skill.',
                // appearance: 'drawer'
            },
        }, {
            name: 'relatedExperiences',
            type: 'join',
            collection: 'experiences',
            on: 'relatedSkills',
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
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    // versions: VersionConfig(),
}