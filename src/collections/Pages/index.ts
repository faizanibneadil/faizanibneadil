import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { slugify } from "@/utilities/slugify";
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { slugField, type CollectionConfig, APIError } from "payload";

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
            name: 'enableCollection',
            label: 'Enable Collection',
            admin: {
                position: 'sidebar',
                description: 'If you want to show your collections like: Blogs, Notes, Publications, Projects etc then you have to change collection.',
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
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })],
        beforeChange: [populatePublishedAt],
    },
    versions: {
        drafts: {
            autosave: true,
        },
        maxPerDoc: 50,
    },
}