import type { Plugin } from "payload";
import { s3Storage } from '@payloadcms/storage-s3'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { superAdminOrTenantAdminAccess } from "@/access/superAdminOrTenantAdmin";
import { RevalidateFormById } from "@/hooks/RevalidateFormById";
import { RevalidatePageAfterChange } from "@/hooks/RevalidatePage";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { generateRoute } from "@/utilities/generateRoute";
import { getServerSideURL } from "@/utilities/getURL";
import { seoGemini } from "@/utilities/seo-gemini";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { isSuperAdmin } from "@/access/isSuperAdmin"
import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import type { Config } from "payload"

export const plugins: Plugin[] = [
    formBuilderPlugin({
        formOverrides: {
            trash: true,
            access: {
                create: superAdminOrTenantAdminAccess,
                delete: superAdminOrTenantAdminAccess,
                read: () => true,
                update: superAdminOrTenantAdminAccess,
            },
            hooks: {
                afterChange: [
                    RevalidatePageAfterChange({
                        invalidateRootRoute: true
                    }),
                    RevalidateFormById()
                ]
            },
            fields: ({ defaultFields }) => {
                // console.log({ defaultFields })
                return defaultFields.map((field) => {
                    if ('name' in field && field.name === 'confirmationMessage') {
                        return {
                            ...field,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        FixedToolbarFeature(),
                                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] })
                                    ]
                                }
                            })
                        }
                    }
                    if ('name' in field && field.name === 'submitButtonLabel') {
                        return {
                            type: 'row',
                            fields: [
                                { ...field, admin: { width: '33.33%' } },
                                { type: 'number', defaultValue: 100, name: 'submitButtonWidth', label: 'Submit Button Width (percentage)', admin: { width: '33.33%' } },
                                { type: 'text', defaultValue: 'Loading...', name: 'submitButtonLoadingText', label: 'Submit Button Loading Text', admin: { width: '33.33%', description: 'e.g: (Loading..., Submitting..., Subscribing...) etc' } }
                            ]
                        }
                    }
                    return field
                })
            }
            // versions: {
            //     drafts: {
            //         autosave: {
            //             interval: 375,
            //         },
            //         schedulePublish: true,
            //     },
            //     maxPerDoc: 50,
            // }
        },
        formSubmissionOverrides: {
            access: {
                create: () => true,
                delete: superAdminOrTenantAdminAccess,
                read: () => true,
                update: superAdminOrTenantAdminAccess,
            },
            // fields: ({ defaultFields }) => {
            //     const fields = defaultFields.map(field => ({
            //         ...field,
            //         admin: {
            //             readOnly: true
            //         }
            //     }))
            //     return fields
            // }
        },
        fields: {
            payment: false
        },
        redirectRelationships: ['pages']
    }),
    seoPlugin({
        uploadsCollection: 'media',
        generateTitle: async ({ doc, collectionSlug, req: { payload } }) => {
            const fallbackTitle = doc?.title || 'Untitled'
            try {
                switch (collectionSlug) {
                    case 'achievements':
                    case 'blogs':
                    case 'industries':
                    case 'certifications':
                    case 'educations':
                    case 'hackathons':
                    case 'licenses':
                    case 'pages':
                    case 'projects':
                    case 'researches':
                    case 'publications':
                        return await seoGemini({
                            collection: collectionSlug!,
                            entity: 'title',
                            data: doc?.title
                        })
                    default:
                        return fallbackTitle;
                }
            } catch (error) {
                payload.logger.error(error, `Something went wrong when generating seo title using ${collectionSlug}`)
                return fallbackTitle
            }

        },
        generateDescription: async ({ doc, collectionSlug, req: { payload } }) => {
            try {
                switch (collectionSlug) {
                    case 'blogs':
                    case 'achievements':
                    case 'industries':
                    case 'certifications':
                    case 'educations':
                    case 'hackathons':
                    case 'licenses':
                    case 'publications':
                    case 'researches':
                        return await seoGemini({
                            collection: collectionSlug,
                            entity: 'description',
                            data: convertLexicalToPlaintext({ data: doc?.description })
                        })
                    case 'projects':
                        return await seoGemini({
                            collection: collectionSlug,
                            entity: 'description',
                            data: convertLexicalToPlaintext({ data: doc?.detailedOverview })
                        })
                    default:
                        return 'You have to write description manually...'
                }
            } catch (error) {
                payload.logger.error(error, `Somwthing went wrong when generating seo description using gemini.`)
                return 'You have to write description manually...'
            }
        },
        generateURL: async ({ doc, collectionSlug, req: { payload, headers } }) => {
            try {
                const idOfTenant = getTenantFromCookie(headers, 'number')
                if (idOfTenant) {
                    const { domain } = await payload?.findByID({
                        collection: 'tenants',
                        id: idOfTenant,
                        select: { domain: true }
                    })

                    const { RouteWithDocSlug } = generateRoute({
                        domain: domain as string,
                        slug: collectionSlug,
                        id: doc?.id,
                        docSlug: doc?.slug
                    })

                    return getServerSideURL() + RouteWithDocSlug
                }
                return getServerSideURL()
            } catch (error) {
                payload.logger.error(error, 'Something went wrong in seo generateURL fn when fetching domain.')
                return getServerSideURL()
            }
        },
        generateImage: ({ doc, collectionSlug, req: { payload } }) => {
            try {
                switch (collectionSlug) {
                    case 'blogs':
                        return doc?.featured_image
                    case 'projects':
                        return doc?.thumbnail
                    case 'achievements':
                    case 'certifications':
                    case 'educations':
                    case 'hackathons':
                    case 'licenses':
                    case 'publications':
                    case 'researches':
                        return doc?.image
                    default:
                        return ''
                }
            } catch (error) {
                payload.logger.error(error, `Something went wrong when generating seo image using ${collectionSlug}`)
                return ''
            }
        },
    }),
    s3Storage({
        enabled: true,
        collections: {
            media: {
                prefix: 'media'
            }
        },
        bucket: process.env.S3_BUCKET!,
        config: {
            forcePathStyle: true, // Important for using Supabase
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            region: process.env.S3_REGION,
            endpoint: process.env.S3_ENDPOINT,
        },
    }),
    mcpPlugin({
        userCollection: 'users',
        collections: {
            blogs: {
                enabled: true
            },
        },
    }),
    multiTenantPlugin<Config>({
        collections: {
            pages: {},
            blogs: {},
            media: {},
            projects: {},
            educations: {},
            achievements: {},
            certifications: {},
            hackathons: {},
            licenses: {},
            publications: {},
            researches: {},
            skills: {},
            experiences: {},
            "form-submissions": {},
            forms: {},
            menus: { isGlobal: true },
            socials: { isGlobal: true },
            integration: { isGlobal: true },
            "portfolio-settings": { isGlobal: true }
        },
        tenantField: {
            access: {
                read: () => true,
                update: ({ req }) => {
                    if (isSuperAdmin(req.user)) {
                        return true
                    }
                    return getUserTenantIDs(req.user as any ,'tenant-admin').length > 0
                },
            },
        },
        i18n: {
            translations: {
                en: {
                    "nav-tenantSelector-label": 'Portfolios',
                    "assign-tenant-button-label": 'Assign Portfolio',
                    "field-assignedTenant-label": 'Assigned Portfolio'
                }
            }
        },
        tenantsArrayField: {
            includeDefaultField: false,
        },
        userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    })
]