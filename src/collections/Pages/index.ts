import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { NavigationGroups } from "@/constants";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    admin: { useAsTitle: 'title', group: NavigationGroups.portfolio },
    custom: {
        collection: 'pages',
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
            type: 'select',
            name: 'mode',
            label: 'Page Mode',
            defaultValue: 'layout',
            required: true,
            options: [
                { label: 'Layout', value: 'layout' },
                { label: 'Collection', value: 'collection' }
            ],
            admin: {
                description: 'If this checked you can show your collection',
                position: 'sidebar',
            }
        },
        {
            type: 'group',
            name: 'configurations',
            label: 'Configurations',
            admin: {
                condition: (blocks, siblings_blocks, ctx) => {
                    if (blocks?.mode === 'collection') {
                        return true
                    }
                    return false
                },
            },
            fields: [
                {
                    type: 'select',
                    name: 'slug',
                    options: [
                        { label: 'Projects', value: 'projects' },
                        { label: 'Notes', value: 'notes' },
                        { label: 'Blogs', value: 'blogs' }
                    ],
                    admin:{
                        components:{
                            Field: '@/collections/Pages/components/collection-slug-field.tsx#CollectionSlugField'
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
                condition: (blocks, siblings_blocks, ctx) => {
                    if (blocks?.mode === 'layout') {
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