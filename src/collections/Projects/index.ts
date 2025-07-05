import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";

export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    admin: { useAsTitle: 'title' },
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
            type: 'join',
            name: 'Skills',
            collection: 'skills',
            on: 'projects',
            hasMany: true,
            admin: {
                description: 'Provide list of skills. You used to build this project'
            }
        },
        {
            type: 'group',
            name: 'credential',
            label: 'Credential',
            admin: { description: 'Provide credential for testing.' },
            fields: [
                { type: 'email', name: 'credential_email', label: 'Email' },
                { type: 'text', name: 'credential_password', label: 'Password' },
                {
                    type: 'text',
                    name: 'credential_username',
                    label: 'Username',
                    admin: {
                        description: 'If you handled your authentication with username then provide otherwize leave it.'
                    }
                }
            ]
        },
        {
            type: 'relationship',
            name: 'thumbnail',
            label: 'Thumbnail',
            relationTo: 'media',
            hasMany: false,
            admin: {
                description: 'Provide project thumbnail.',
                appearance: 'drawer',
                position:'sidebar'
            }
        },
        ...slugField(),
    ],
    // hooks: {
    //     afterChange: [revalidatePage],
    //     beforeChange: [populatePublishedAt],
    //     afterDelete: [revalidateDelete],
    // },
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