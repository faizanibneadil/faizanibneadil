import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";

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
        {
            type: 'text',
            name: 'title',
            label: 'Title'
        },
        {
            type: 'checkbox',
            name: 'designMode',
            label: 'Design Mode',
            defaultValue: true,
            admin: {
                description: 'If this checked you can show your collection',
                position: 'sidebar',
            }
        },
        {
            type: 'group',
            name: 'config',
            admin: {
                condition: (data, siblings, ctx) => !data?.designMode
            },
            fields: [
                {
                    type: 'select',
                    name: 'col',
                    options: [{label:'test',value:'test'}],
                    admin: {
                        components: {
                            Field: {
                                path: '@/collections/Pages/components/collectionConfig.client.tsx',
                                exportName: 'CollectionConfig'
                            }
                        }
                    }
                }
            ]
        },
        {
            type: 'blocks',
            name: 'layout',
            label: 'Design You\'r Page',
            blocks: [],
            blockReferences: ['contact', 'education', 'hero', 'skills', 'experiances', 'about'],
            admin: {
                condition: (data, siblings, ctx) => data?.designMode
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