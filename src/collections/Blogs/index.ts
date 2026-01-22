import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { RichTextLinkFeature } from "@/utilities/RichTextLinkFeature";
import { generatePreview } from "@/utilities/generate-preview";
import { slugify } from "@/utilities/slugify";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig } from "payload";


export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    labels: { plural: 'Blogs', singular: 'Blog' },
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
            type: 'tabs',
            tabs: [
                {
                    name: 'content',
                    label: 'Content',
                    fields: [
                        {
                            type: 'richText',
                            name: 'content',
                            label: false,
                            editor: lexicalEditor({
                                features({ defaultFeatures, rootFeatures, }) {
                                    return [
                                        ...rootFeatures,
                                        RichTextLinkFeature(),
                                        BlocksFeature({
                                            blocks: ['formBlock', 'project', 'code-block'],
                                        }),
                                    ]
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
                            },
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
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}