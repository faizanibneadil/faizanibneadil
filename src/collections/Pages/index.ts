import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { ProtectRootPage } from "@/collections/Pages/hooks/ProtectRootPage";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { SwapRootPage } from "@/collections/Pages/hooks/SwapRootPage";
import { slugify } from "@/utilities/slugify";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { slugField, type CollectionConfig, APIError } from "payload";
import { ProtectRootPageFromTrash } from "./hooks/ProtectRootPageFromTrash";
import { RevalidateRootPageQuery } from "./hooks/RevalidateRootPageQuery";
import { RevalidatePageModeQuery } from "./hooks/RevalidatePageModeQuery";
import { RevalidatePageCollectionSlugQuery } from "./hooks/RevalidatePageCollectionSlugQuery";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    labels: { plural: 'Pages', singular: 'Page' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'enableCollection']
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
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            type: 'text',
                            name: 'configuredCollectionSlug',
                            admin: {
                                condition: ({ enableCollection }) => Boolean(enableCollection) === true,
                                components: {
                                    Field: '@/collections/Pages/components/collections.tsx#Collections'
                                },
                            },
                            hooks: {
                                afterChange: [RevalidatePageCollectionSlugQuery()]
                            },
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
                                'blogs-block',
                                'certification',
                                'code-block',
                                'contact',
                                'education',
                                'experience',
                                'formBlock',
                                'github-contributions',
                                'hackathon',
                                'hero',
                                'license',
                                'project',
                                'publication',
                                'research',
                                'skill'
                            ],
                            admin: {
                                initCollapsed: true,
                                condition: ({ enableCollection }) => Boolean(enableCollection) === false,
                            }
                        },
                    ]
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        MetaTitleField({
                            // if the `generateTitle` function is configured
                            hasGenerateFn: true,
                        }),
                        MetaDescriptionField({
                            // if the `generateDescription` function is configured
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            // the upload collection slug
                            relationTo: 'media',

                            // if the `generateImage` function is configured
                            hasGenerateFn: true,
                        }),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                        OverviewField({
                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        })
                    ]
                }
            ]
        },
        {
            type: 'checkbox',
            name: 'isRootPage',
            label: 'Set as Main page',
            admin: {
                position: 'sidebar',
                description: "Set this page as your portfolio's primary Home Page. Only one page can be active as the Main Page at a time."
            },
            required: true,
            hooks: {
                afterChange: [RevalidateRootPageQuery()]
            },
            validate: async (value, { req }) => {
                // TODO: get tenant from doc
                const selectedTenantId = getTenantFromCookie(req.headers, 'number')
                if (value === false) {
                    try {
                        const pages = await req.payload.count({
                            collection: 'pages',
                            where: {
                                and: [
                                    { tenant: { equals: selectedTenantId } },
                                    { isRootPage: { equals: true } }
                                ]
                            },
                            req
                        });

                        if (pages.totalDocs === 0) {
                            return "At least one landing page is required.";
                        }
                    } catch (error) {
                        if (error instanceof APIError) {
                            req.payload.logger.error({ error }, 'Payload Error')
                            return error.message
                        }
                        req.payload.logger.error({ error }, 'Internal Server Error')
                        return 'Internal Server Error'
                    }
                }
                return true
            },
        },
        {
            type: 'checkbox',
            name: 'enableCollection',
            label: 'Enable Collection',
            admin: {
                position: 'sidebar',
                description: 'If you want to show your collections like: Blogs, Notes, Publications, Projects etc then you have to change collection.',
            },
            hooks: {
                afterChange: [RevalidatePageModeQuery()]
            },
            required: true,
            defaultValue: false
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        // TODO: use custom solution for this field
        slugField({
            name: 'slug',
            checkboxName: 'lockSlug',
            slugify: ({ valueToSlugify, data }) => {
                const fieldToSlug = slugify(valueToSlugify)
                return `${fieldToSlug}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
            },
        }),
    ],
    hooks: {
        afterChange: [
            SwapRootPage(),
            RevalidatePageAfterChange({ invalidateRootRoute: true }),
        ],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeDelete: [ProtectRootPage()],
        beforeChange: [
            populatePublishedAt,
            ProtectRootPageFromTrash()
        ],
    },
    versions: true
}