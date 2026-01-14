import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
// import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Educations: CollectionConfig<'educations'> = {
    slug: 'educations',
    labels: { plural: 'Educations', singular: 'Education' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.resume,
        preview: generatePreview({ collection: 'educations' })
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
                            name: 'description',
                            label: 'Description',
                            editor: lexicalEditor()
                        },
                        {
                            type: 'group',
                            name: 'qualification',
                            label: 'Qualification',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            type: 'text',
                                            label: 'Academy',
                                            name: 'academy',
                                        },
                                        {
                                            type: 'text',
                                            label: 'Degree',
                                            name: 'degree',
                                        }
                                    ]
                                }
                            ]
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
                            type: 'upload',
                            relationTo: 'media',
                            name: 'image',
                            label: 'Avatar',
                            required: true,
                            hasMany: false,
                            admin: {
                                position: 'sidebar'
                            }
                        }
                    ]
                },
                {
                    name: 'seo',
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
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    // versions: VersionConfig(),
}