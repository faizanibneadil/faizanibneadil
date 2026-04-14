import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { Iconify } from "@/fields/iconify";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { slugify } from "@/utilities/slugify";
import { CollectionSlug, GroupField, slugField, type CollectionConfig } from "payload";

function skillsSettings(collection: CollectionSlug[]): GroupField[] {
    return collection.map(slug => {
        const collectionSlug = slug.at(0)?.toUpperCase() + slug.slice(1)
        return {
            type: 'group',
            fields: [
                {
                    type: 'checkbox',
                    name: `enable${collectionSlug}Count`,
                    label: `Enable ${collectionSlug} Count`,
                    defaultValue: false,
                    admin: {
                        width: '50%',
                        description: `Display total number of ${collectionSlug} linked to this skill.`
                    }
                },
                {
                    type: 'join',
                    name: slug,
                    collection: slug,
                    maxDepth: 0,
                    on: ['educations', 'experiences'].includes(slug) ? 'skills' : 'content.skills',
                    admin: {
                        allowCreate: false,
                        disableListColumn: true,
                        disableRowTypes: true,
                        disableListFilter: true,
                        defaultColumns: ['title'],
                        condition: fields => Boolean(fields[`enable${collectionSlug}Count`])
                    }
                }
            ]
        }
    })
}

export const Skills: CollectionConfig<'skills'> = {
    slug: 'skills',
    labels: { plural: 'Skills', singular: 'Skill' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.resume,
        defaultColumns: ['title', 'slug', 'icon',],
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
        },
        {
            type: 'group',
            fields: [
                {
                    type: 'checkbox',
                    name: 'enableLabel',
                    label: 'Enable Label',
                    defaultValue: false,
                    admin: {
                        width: '50%',
                        description: 'Display the text label/name of the skill.'
                    }
                },
                {
                    type: 'text',
                    name: 'skillCustomLabel',
                    label: 'Custom Label',
                    admin: {
                        condition: ({ enableLabel }) => Boolean(enableLabel),
                        description: 'Custom Label'
                    }
                }
            ]
        },
        {
            type: 'group',
            fields: [
                {
                    type: 'checkbox',
                    name: 'enableIcon',
                    label: 'Enable Icon',
                    defaultValue: false,
                    admin: {
                        width: '50%',
                        description: 'Display the graphical icon associated with this skill.'
                    }
                },
                {
                    type: 'text',
                    name: 'icon',
                    label: 'Search Icon',
                    admin: {
                        components: {
                            Field: '@/collections/Skills/components/icon.tsx#Icon'
                        },
                        condition: ({ enableIcon }) => Boolean(enableIcon),
                        description: 'Search and select an icon for this skill. Note: This icon will only be visible if "Display Icon" is enabled above.'
                    }
                },
            ]
        },
        ...skillsSettings([
            'achievements',
            'certifications',
            'educations',
            'experiences',
            'hackathons',
            'projects',
            'publications',
            'researches'
        ]),
        slugField({
            name: 'slug',
            checkboxName: 'lockSlug',
            slugify: ({ valueToSlugify }) => {
                const slug = slugify(valueToSlugify)
                return `${slug}-${Date.now()}`
            },
        }),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    versions: true
}