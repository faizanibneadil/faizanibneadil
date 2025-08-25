import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { getServerSideURL } from "@/utilities/getURL";
import { VersionConfig } from "@/utilities/version-config";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { headers as getHeaders } from "next/headers";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    trash: true,
    admin: {
        useAsTitle: 'title',
        group: NavigationGroups.portfolio,
        livePreview: {
            url: async ({ data, req: { payload } }) => {
                const headers = await getHeaders()
                const tenant = await payload?.findByID({
                    collection: 'tenants',
                    id: getTenantFromCookie(headers, 'number') as number,
                    select: { domain: true }
                })
                return `${getServerSideURL()}/${tenant?.domain}/p/${data?.slug}`
            }
        },
        preview: async (doc, { req: { payload } }) => {
            const headers = await getHeaders()
            if (getTenantFromCookie(headers, 'number')) {
                const tenant = await payload?.findByID({
                    collection: 'tenants',
                    id: getTenantFromCookie(headers, 'number') as number,
                    select: { domain: true }
                })
                const encodedParams = new URLSearchParams({
                    slug: doc?.slug as string,
                    collection: 'pages',
                    path: `/${tenant?.domain}/p/${doc?.slug}`,
                    previewSecret: process.env.PREVIEW_SECRET || '',
                })
                return `${getServerSideURL()}/preview?${encodedParams.toString()}`
            }

            return null
        },
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
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    versions: VersionConfig(),
}