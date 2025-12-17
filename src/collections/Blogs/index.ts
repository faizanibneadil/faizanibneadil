import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { Blog } from "@/payload-types";
import { generatePreview } from "@/utilities/generate-preview";
import { getServerSideURL } from "@/utilities/getURL";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
// import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { headers as getHeaders } from "next/headers";
import type { CollectionConfig } from "payload";


export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
        preview: generatePreview({ collection: 'blogs' })
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
            type: 'richText',
            name: 'content',
            label: false,
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...defaultFeatures, ...rootFeatures]
                },
            })
        },
        {
            type: 'richText',
            name: 'description',
            label: false,
            admin: {
                description: 'Blog short description.'
            },
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...defaultFeatures, ...rootFeatures]
                },
            })
        },
        {
            type: 'upload',
            name: 'featured_image',
            label: 'Featured Image',
            relationTo: 'media',
            hasMany: false,
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}