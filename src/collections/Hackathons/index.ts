import { isSuperAdmin } from "@/access/isSuperAdmin";
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { NavigationGroups } from "@/constants";
import { Iconify } from "@/fields/iconify";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { generatePreview } from "@/utilities/generate-preview";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
// import { VersionConfig } from "@/utilities/version-config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Hackathons: CollectionConfig<'hackathons'> = {
    slug: 'hackathons',
    labels: { plural: 'Hackathons', singular: 'Hackathon' },
    trash: true,
    admin: {
        useAsTitle: 'title',
        // group: NavigationGroups.portfolio,
        hidden: ({ user }) => {
            if (isSuperAdmin(user)) {
                return false
            }
            if (user?.industry.slug === 'information-technology') {
                return false
            }
            return true
        },
        preview: generatePreview({ collection: 'hackathons' })
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
                    fields: [{
                        type: 'richText',
                        name: 'description',
                        label: false,
                        editor: lexicalEditor(),
                        admin: {
                            description: 'Write description.'
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
                                        label: 'TO',
                                        required: true
                                    },
                                    {
                                        type: 'date',
                                        name: 'from',
                                        label: 'FROM',
                                        required: true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'text',
                        name: 'location',
                        label: 'Location'
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
                                    Iconify(),
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
                    }]
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