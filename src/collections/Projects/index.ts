import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { IconField } from "@/fields/icon";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
// import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig<'projects'> = {
    slug: 'projects',
    trash: true,
    admin: { 
        useAsTitle: 'title', 
        // group: NavigationGroups.portfolio,
        preview: generatePreview({ collection: 'projects' }) 
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
            type: 'upload',
            name: 'thumbnail',
            label: 'Thumbnail',
            relationTo: 'media',
            required: true,
            hasMany: false,
            admin: {
                description: 'Provide project thumbnail.',
            }
        },
        {
            type: 'richText',
            name: 'overview',
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...defaultFeatures, ...rootFeatures]
                },
            }),
            label: 'Overview'
        },
        {
            type: 'richText',
            name: 'detailedOverview',
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...defaultFeatures, ...rootFeatures]
                },
            }),
            label: 'Detailed Overview'
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            type: 'relationship',
            name: 'Skills',
            relationTo: 'skills',
            hasMany: true,
            admin: {
                description: 'Provide list of skills. You used to build this project',
                appearance: 'drawer'
            }
        },
        {
            type: 'group',
            name: 'dates',
            label: 'Dates',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'date',
                            name: 'to',
                            label: 'TO'
                        },
                        {
                            type: 'date',
                            name: 'from',
                            label: 'FROM'
                        }
                    ]
                }
            ]
        },
        {
            type: 'group',
            name: 'credential',
            label: 'Credential',
            admin: {
                description: 'Provide credential for testing.',
                condition: (field, siblings, ctx) => {
                    return typeof ctx?.user?.Industry === 'object' ? ctx?.user?.Industry?.slug === 'game-development' || ctx?.user?.Industry?.slug === 'data-scienceanalytics' || ctx?.user?.Industry?.slug === 'web-and-software-development' : false
                }
            },
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
            type: 'array',
            name: 'links',
            labels: { singular: 'Link', plural: 'Links' },
            admin: {
                initCollapsed: true
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        IconField(),
                        {
                            type: 'text',
                            label: 'Lable',
                            name: 'label',
                            required: true
                        },
                        {
                            type: 'text',
                            name: 'link',
                            label: 'Link',
                            required: true
                        }
                    ]
                }
            ],
            maxRows: 5
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    // versions: VersionConfig(),
}