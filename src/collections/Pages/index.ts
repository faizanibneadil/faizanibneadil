import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    admin: { useAsTitle: 'title' },
    custom: {
        collection: 'pages'
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
                }
            ]
        },
        {
            type: 'blocks',
            name: 'layout',
            label: 'Design You\'r Page',
            blocks: [],
            maxRows: 50,
            blockReferences: [
                'contact',
                'education',
                'hero',
                'skill',
                'experiance',
                'about',
                'hackathon',
                'project'
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
                interval: 100,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}