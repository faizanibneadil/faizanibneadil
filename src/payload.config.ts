import path from 'path'
import { buildConfig, inMemoryKVAdapter } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Plugins
import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor, InlineToolbarFeature, RelationshipFeature } from '@payloadcms/richtext-lexical'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo';
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { resendAdapter } from '@payloadcms/email-resend'
// Collections
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Notes } from '@/collections/Notes'
import { Blogs } from '@/collections/Blogs'
import { Pages } from '@/collections/Pages'
import { Projects } from "@/collections/Projects"
import { Tenants } from '@/collections/Tenants'
import { Skills } from "@/collections/Skills"
import { Hackathons } from "@/collections/Hackathons"
import { Researches } from "@/collections/Researches"
import { Achievements } from "@/collections/Achievements"
import { Certifications } from "@/collections/Certifications"
import { Publications } from "@/collections/Publications"
import { Licenses } from "@/collections/Licenses"
import { Menus } from '@/collections/Menus'
import { Socials } from '@/collections/Socials'
import { Educations } from '@/collections/Educations'
import { Icons } from '@/collections/Icons'
import { Industries } from '@/collections/Industries'
// Blocks
import { Hero } from '@/blocks/Hero'
import { Contact } from '@/blocks/Contact'
import { Education } from '@/blocks/Education'
import { Project } from '@/blocks/Project'
import { Skill } from '@/blocks/Skill'
import { Experiance } from '@/blocks/Experiances'
import { About } from '@/blocks/About'
import { Hackathon } from '@/blocks/Hackathon'
import { Research } from '@/blocks/Research'
import { Publication } from '@/blocks/Publication'
import { License } from '@/blocks/Licenses'
import { Certification } from '@/blocks/Certification'
import { Achievement } from '@/blocks/Achievement'

import { Config } from './payload-types'
import { isSuperAdmin } from './access/isSuperAdmin'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import { getServerSideURL } from './utilities/getURL'
import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import { generateRoute } from './utilities/generateRoute';
// import { generateDescriptionWithGemini } from './utilities/generateDescriptionWithGemini';
import { seoGemini } from './utilities/seo-gemini';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    kv: inMemoryKVAdapter(),
    hooks: {
        afterError: [console.log]
    },
    // upload: {
    //     limits: {
    //         fileSize: 2000
    //     }
    // },
    admin: {
        suppressHydrationWarning: true,
        meta: {
            applicationName: 'Skill Shelf',
            titleSuffix: '- SkillShelf',
            icons: [{
                type: 'image/svg',
                rel: 'icon',
                url: '/graphics/favicon.svg'
            }],
            openGraph: {
                title: 'SkillShelf',
                description: 'Share you\'r skills with SkillShelf.',
                images: [{
                    url: `${getServerSideURL()}/graphics/favicon.svg`,
                    height: 600,
                    width: 800
                }]
            }
        },
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        components: {
            // actions: ['@/components/portfolio-preview.tsx#PortfolioPreview'],
            graphics: {
                Logo: {
                    path: '@/components/branding.tsx',
                    exportName: 'Branding',
                    clientProps: {
                        alt: "Open Shelf Logo",
                        className: 'w-full h-40',
                        fill: true,
                        darkSrc: '/graphics/skillshelf-text-light.svg',
                        lightSrc: '/graphics/skillshelf-text-dark.svg',
                        priority: true,
                        fetchPriority: 'high',
                        loading: 'eager',
                        unoptimized: true
                    }
                },
                Icon: {
                    path: '@/components/branding.tsx',
                    exportName: 'Branding',
                    clientProps: {
                        alt: "Open Shelf Logo",
                        className: 'size-5',
                        fill: true,
                        darkSrc: '/graphics/favicon.svg',
                        lightSrc: '/graphics/favicon.svg',
                        priority: true,
                        fetchPriority: 'high',
                        loading: 'eager',
                        unoptimized: true
                    }
                }
            }
        },
        // livePreview: {
        //     breakpoints: [
        //         {
        //             label: 'Mobile',
        //             name: 'mobile',
        //             width: 375,
        //             height: 667,
        //         }
        //     ]
        // },
    },
    cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
    csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
    collections: [
        Users,
        Icons,
        Media,
        Notes,
        Blogs,
        Pages,
        Educations,
        Projects,
        Tenants,
        Menus,
        Socials,
        Skills,
        Hackathons,
        Researches,
        Achievements,
        Certifications,
        Publications,
        Licenses,
        Industries
    ],
    blocks: [
        Hero,
        Contact,
        Education,
        Project,
        Skill,
        Experiance,
        About,
        Hackathon,
        Research,
        Publication,
        License,
        Certification,
        Achievement
    ],
    globals: [],
    editor: lexicalEditor({
        features({ defaultFeatures, rootFeatures }) {
            return [
                ...defaultFeatures,
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                RelationshipFeature({
                    enabledCollections: [
                        'achievements',
                        'blogs',
                        'certifications',
                        'educations',
                        'socials',
                        'skills',
                        'researches',
                        'publications',
                        'projects',
                        'pages',
                        'notes',
                        'licenses',
                    ]
                })
            ]
        },
    }),
    secret: process.env.PAYLOAD_SECRET!,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    email: resendAdapter({
        defaultFromAddress: 'faizanibneadil1@gmail.com',
        defaultFromName: 'Skill Shelf',
        apiKey: process.env.RESEND_API_KEY!,
    }),
    // database-adapter-config-start
    db: postgresAdapter({
        blocksAsJSON: true,
        readReplicas: [process.env.NEON_READ_REPLICA_URI_1!, process.env.NEON_READ_REPLICA_URI_2!],
        pool: {
            connectionString: process.env.NEON_URI
        }
    }),
    // database-adapter-config-end
    sharp,
    onInit: async (payload) => {
        payload.logger.info('App is initialized ...')
        payload.logger.info('Finding home page in pages collection...')
    },
    plugins: [
        // payloadCloudPlugin(),
        // storage-adapter-placeholder
        uploadthingStorage({
            collections: {
                media: true,
            },
            options: {
                token: process.env.UPLOADTHING_TOKEN,
                acl: 'public-read',
            },
        }),
        formBuilderPlugin({
            formOverrides: {
                trash: true,
                access: {
                    create: superAdminOrTenantAdminAccess,
                    delete: superAdminOrTenantAdminAccess,
                    read: () => true,
                    update: superAdminOrTenantAdminAccess,
                },
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
                    create: superAdminOrTenantAdminAccess,
                    delete: superAdminOrTenantAdminAccess,
                    read: () => true,
                    update: superAdminOrTenantAdminAccess,
                }
            },
            fields: {
                checkbox: true,
                country: true,
                date: true,
                email: true,
                message: true,
                number: true,
                select: true,
                state: true,
                text: true,
                textarea: true
            },
            redirectRelationships: ['pages']
        }),
        seoPlugin({
            collections: [
                'achievements',
                'blogs',
                'categories',
                'certifications',
                'educations',
                'hackathons',
                'licenses',
                'notes',
                'pages',
                'projects',
                'publications',
                'researches',
            ],
            uploadsCollection: 'media',
            generateTitle: async ({ doc, collectionSlug }) => {
                const fallbackTitle = doc?.title || 'Untitled'
                switch (collectionSlug) {
                    case 'achievements':
                    case 'blogs':
                    case 'industries':
                    case 'certifications':
                    case 'educations':
                    case 'hackathons':
                    case 'licenses':
                    case 'notes':
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

            },
            generateDescription: async ({ doc, collectionSlug }) => {
                switch (collectionSlug) {
                    case 'blogs':
                    case 'notes':
                        return await seoGemini({
                            collection: collectionSlug,
                            entity: 'description',
                            data: convertLexicalToPlaintext({ data: doc?.content })
                        })
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
            },
            generateURL: async ({ doc, collectionSlug, req: { payload } }) => {
                try {
                    const { domain } = await payload?.findByID({
                        collection: 'tenants',
                        id: doc?.tenant as number,
                        select: { domain: true }
                    })

                    const { RouteWithDocSlug } = generateRoute({
                        domain: domain as string,
                        slug: collectionSlug,
                        id: doc?.id,
                        docSlug: doc?.slug
                    })

                    return getServerSideURL() + RouteWithDocSlug
                } catch (error) {
                    payload.logger.error(error, 'Something went wrong in seo generateURL fn when fetching domain.')
                    return getServerSideURL()
                }
            },
            generateImage: ({ doc, collectionSlug }) => {
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
            },
        }),
        multiTenantPlugin<Config>({
            collections: {
                pages: {},
                blogs: {},
                media: {},
                notes: {},
                projects: {},
                educations: {},
                achievements: {},
                certifications: {},
                hackathons: {},
                licenses: {},
                publications: {},
                researches: {},
                skills: {},
                // icons: { },
                "form-submissions": {},
                forms: {},
                menus: { isGlobal: true },
                socials: { isGlobal: true }
            },
            tenantField: {
                access: {
                    read: () => true,
                    update: ({ req }) => {
                        if (isSuperAdmin(req.user)) {
                            return true
                        }
                        return getUserTenantIDs(req.user).length > 0
                    },
                },
            },
            tenantsArrayField: {
                includeDefaultField: false,
            },
            userHasAccessToAllTenants: (user) => isSuperAdmin(user),
        }),
    ],
})