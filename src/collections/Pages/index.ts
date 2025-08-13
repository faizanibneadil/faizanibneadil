import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { NavigationGroups } from "@/constants";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    admin: { useAsTitle: 'title', group: NavigationGroups.portfolio },
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    fields: [
        TitleField(),
        {
            type: 'group',
            name: 'pageMode',
            label: 'Page Mode',
            admin: {
                description: 'If you want to show your collections like: Blogs, Notes, Publications, Projects etc then you have to change Page Mode into collection.',
            },
            fields: [
                {
                    type: 'radio',
                    name: 'mode',
                    label: 'Mode',
                    defaultValue: 'layout',
                    required: true,
                    options: [
                        { label: 'Layout', value: 'layout' },
                        { label: 'Collection', value: 'collection' }
                    ],
                }
            ]
        },
        {
            type: 'group',
            name: 'configurations',
            label: 'Configurations',
            admin: {
                condition: (fields, siblings_blocks, ctx) => {
                    if (fields?.pageMode?.mode === 'collection') {
                        return true
                    }
                    return false
                },
            },
            fields: [
                {
                    type: 'text',
                    name: 'slug',
                    admin: {
                        components: {
                            Field: '@/collections/Pages/components/collections.tsx#Collections'
                        }
                    }
                },
            ]
        },
        {
            type: 'blocks',
            name: 'layout',
            label: 'Design You\'r Page',
            blocks: [],
            maxRows: 50,
            blockReferences: [
                'about',
                'achievement',
                'certification',
                'contact',
                'education',
                'experiance',
                'hackathon',
                'hero',
                'license',
                'project',
                'publication',
                'skill',
                'research',
            ],
            admin: {
                initCollapsed: true,
                condition: (fields, siblings_blocks, ctx) => {
                    if (fields?.pageMode?.mode === 'layout') {
                        return true
                    }
                    return false
                }
            }
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidatePage],
        beforeChange: [populatePublishedAt],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 30000,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}