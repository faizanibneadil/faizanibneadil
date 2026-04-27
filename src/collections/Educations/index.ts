import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { TitleField } from "@/fields/title";
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from "@/hooks/RevalidatePage";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Educations: CollectionConfig<'educations'> = {
    slug: 'educations',
    labels: { plural: 'Educations', singular: 'Education' },
    trash: true,
    admin: {
        useAsTitle: 'title', // Suggestion: Degree name or Course title
        defaultColumns: ['title', 'qualification_academy', 'dates_from', 'currentlyStudying'],
    },
    defaultPopulate: {
        resources: true,
        skills: true,
        tenant: true,
        _status: true,
        academy: true,
        createdAt: true,
        dates: true,
        degree: true,
        description: true,
        details: true,
        image: true,
        title: true,
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
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'academy',
                    label: 'Institution / University',
                    admin: {
                        width: '50%',
                        description: 'Name of the school, university, or bootcamp.'
                    }
                },
                {
                    type: 'text',
                    name: 'degree',
                    label: 'Degree / Field of Study',
                    admin: {
                        width: '50%',
                        description: 'e.g., Computer Science, Graphic Design, etc.'
                    }
                }
            ]
        },
        {
            type: 'upload',
            relationTo: 'media',
            name: 'image',
            label: 'Institution Logo',
            admin: {
                description: 'Upload university or school logo.'
            }
        },
        {
            type: 'richText',
            name: 'description',
            label: 'Overview & Achievements',
            editor: lexicalEditor(),
            admin: {
                description: 'Mention key subjects, thesis topics, or academic honors.'
            }
        },
        {
            type: 'relationship',
            relationTo: 'skills',
            name: 'skills',
            label: 'Skills',
            hasMany: true
        },
        {
            type: 'group',
            name: 'details',
            label: 'Additional Details',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'grade',
                            type: 'text',
                            label: 'Grade / GPA',
                            admin: {
                                width: '50%',
                                placeholder: 'e.g., 3.8/4.0 or Grade A'
                            }
                        },
                        {
                            name: 'location',
                            type: 'text',
                            label: 'Location',
                            admin: {
                                width: '50%',
                                placeholder: 'e.g., London, UK or Remote'
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: 'group',
            name: 'dates',
            label: 'Timeline',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'from',
                            type: 'date',
                            label: 'Start Date',
                            admin: { width: '33.33%' }
                        },
                        {
                            name: 'to',
                            type: 'date',
                            label: 'End Date',
                            admin: {
                                width: '33.33%',
                                condition: (data) => !data?.content?.dates?.currentlyStudying
                            }
                        },
                        {
                            name: 'currentlyStudying',
                            type: 'checkbox',
                            label: 'Currently Enrolled',
                            defaultValue: false,
                            admin: {
                                width: '33.33%',
                                style: { marginTop: '35px' }
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: 'array',
            name: 'resources',
            label: 'Resources',
            labels: { singular: 'Resource', plural: 'Resources' },
            admin: {
                description: 'Add links to your thesis, university profile, or digital degree copy.'
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'type',
                            type: 'radio',
                            admin: {
                                layout: 'horizontal',
                                width: '50%',
                            },
                            defaultValue: 'internal',
                            options: [
                                {
                                    label: 'Internal link',
                                    value: 'internal',
                                },
                                {
                                    label: 'External URL',
                                    value: 'external',
                                },
                            ],
                        },
                        {
                            name: 'newTab',
                            type: 'checkbox',
                            admin: {
                                style: {
                                    alignSelf: 'flex-end',
                                },
                                width: '50%',
                            },
                            label: 'Open in new tab',
                        },
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'relationship',
                            relationTo: ['pages'],
                            name: 'page',
                            label: 'Page',
                            admin: {
                                condition: (_, { type }) => type === 'internal',
                                width: '50%'
                            }
                        },
                        {
                            type: 'text',
                            name: 'url',
                            label: 'URL',
                            validate: (url: string | undefined | null) => {
                                try {
                                    if (!url) {
                                        return 'URL is required.'
                                    }
                                    new URL(url)
                                    return true
                                } catch (error) {
                                    return 'Invalid URL'
                                }
                            },
                            admin: {
                                condition: (_, { type }) => type === 'external',
                                width: '50%'
                            }
                        },
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label',
                            admin: {
                                width: '50%'
                            }
                        }
                    ]
                }
            ]
        },
    ],
    hooks: {
        afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
        afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
    },
    versions: {
        drafts: {
            autosave: true,
        },
        maxPerDoc: 50,
    },
}