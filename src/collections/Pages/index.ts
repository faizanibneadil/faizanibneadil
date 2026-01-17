import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { defaultBlocks, digitalArtistSpecificBlocks, itSpecificBlock, pharmaSpecificBlocks } from "@/blocks/config";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { slugify } from "@/utilities/slugify";
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { slugField, type CollectionConfig } from "payload";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    labels: { plural: 'Pages', singular: 'Page' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
        preview: generatePreview({ collection: 'pages' }),
        // livePreview: {
        //     url: async ({ data, req: { payload } }) => {
        //         try {
        //             const { domain } = await payload.findByID({
        //                 collection: 'tenants',
        //                 id: data?.tenant,
        //                 select: { domain: true }
        //             })
        //             return getServerSideURL() + `/${domain}/p/${data?.pageMode?.mode === 'collection' ? data?.configurations?.slug ?? data?.slug : data?.slug}`
        //         } catch (error) {
        //             payload.logger.error(error, 'Something went wrong when fetching tenant for live preview.')
        //             return getServerSideURL()
        //         }
        //     }
        // }
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
                    name: 'content',
                    label: 'Content',
                    fields: [
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
                                    if (fields?.content?.pageMode?.mode === 'collection') {
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
                            filterOptions: async ({ user }) => {
                                const industry = typeof user?.industry === 'object' ? user?.industry?.slug : user?.industry
                                if (typeof industry === 'string') {
                                    switch (industry) {
                                        case 'information-technolegy':
                                            return [...itSpecificBlock, ...defaultBlocks]
                                        case 'pharma':
                                            return [...pharmaSpecificBlocks, ...defaultBlocks]
                                        case 'digital-artist':
                                            return [...digitalArtistSpecificBlocks, ...defaultBlocks]
                                        default:
                                            return true
                                    }
                                }
                                return true
                            },
                            blockReferences: Array.from(new Set([
                                ...defaultBlocks,
                                ...itSpecificBlock,
                                ...pharmaSpecificBlocks,
                                ...digitalArtistSpecificBlocks
                            ])),
                            admin: {
                                initCollapsed: true,
                                condition: (fields, siblings_blocks, ctx) => {
                                    if (fields?.content?.pageMode?.mode === 'layout') {
                                        return true
                                    }
                                    return false
                                }
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
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        slugField({
            name: 'slug',
            checkboxName: 'lockSlug',
            slugify: ({ valueToSlugify }) => {
                return slugify(valueToSlugify)
            },
        }),
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    // versions: VersionConfig(),
}