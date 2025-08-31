// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor, InlineToolbarFeature, RelationshipFeature } from '@payloadcms/richtext-lexical'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

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
import { Categories } from '@/collections/Categories'

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

import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { Config } from './payload-types'
import { isSuperAdmin } from './access/isSuperAdmin'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import { getServerSideURL } from './utilities/getURL'
import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import { generateRoute } from './utilities/generateRoute';
import { generateBlogPostDescWithGemini } from './utilities/generateBlogPostDescWithGemini';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
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
                url: '/skillshelf-symble.svg'
            }],
            openGraph: {
                title: 'SkillShelf',
                description: 'Share you\'r skills with SkillShelf.',
                images: [{
                    url: `${getServerSideURL()}/skillshelf-full.svg`,
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
            graphics: {
                Logo: {
                    path: '@/components/branding.tsx',
                    exportName: 'Branding',
                    clientProps: {
                        alt: "Open Shelf Logo",
                        className: 'w-full h-40',
                        fill: true,
                        src: '/skillshelf-full.svg',
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
                        className: 'size-6',
                        fill: true,
                        src: '/skillshelf-symble.svg',
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
        Categories
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
    secret: process.env.PAYLOAD_SECRET || '',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // database-adapter-config-start
    db: postgresAdapter({
        pool: {
            // connectionString: process.env.SUPABASE_URI
            user: 'avnadmin',
            password: 'AVNS_0ryja1qcOPYvYtSoe9C',
            host: 'portfolio-easypeasy.d.aivencloud.com',
            port: 10171,
            database: 'defaultdb',
            ssl: {
                rejectUnauthorized: true,
                ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUSmPY0sTLDM3ArNxjjYzHtQ7WIrQwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMzIzYjZiYTEtYTQxZC00N2JkLTg5NDgtNDEwYTMxODQ1
MzU1IFByb2plY3QgQ0EwHhcNMjMxMjE2MTQ1NzU4WhcNMzMxMjEzMTQ1NzU4WjA6
MTgwNgYDVQQDDC8zMjNiNmJhMS1hNDFkLTQ3YmQtODk0OC00MTBhMzE4NDUzNTUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJz7wSJd
1C+Qp9tvmDGwjta4/OTVdPMFCD02M0Sjj/ToKcbVX4uC6dSzCmOn3AIZxeBkQDVA
a2tYYwSwC47OPtRMru/mwnFw71OkSkmd7pjk/5xcm5HnauS/RMYI6ZZtVL+uC+TI
MB+QGC0jIH63UR6BblZSSkyPwFMMvkEY6GClORcxAUDbLjavqOeUxUAguRtXcOoG
dKtCnTlTwRjm2rJCpY3r8XIiCIH2e139eiiBkWScBexpetCqIfUihTfvEW3AETd4
QBA0uj8w4aWgRK9i4og+b0Kp2T6JoYG+eRtuxcyxaMOuzscUVZbhdRyv7VOp5iRd
WaRwslRmiG5WCeihAu/3Yhg75o93eB8RomCxeOWplZVxl4duiZZoXTarrwz/6jGZ
pIBW6F84Ep0ccgjpjPNxQ25yLTuE2W+TKZUM/z1bA+JYeKP0Sdt2/3whXpPHZP6e
+pT45Sqhs15Hso1jb5lyk/FPd6NhOcjVCw0wJqhHTsXDYfRulvDVlDvScQIDAQAB
oz8wPTAdBgNVHQ4EFgQUucgcRhXEJJNTnODboBUVCQZJWKMwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHq+SXfK9QvWciuh
ea3TMokYhqMOZbwsqzA94oTMFp26Bv85ceBh4I6nIMIuQNWZYZ26VLVKVpNYAEeW
6JoslLkOjVi/8x9Z8SAjnKH8l8KUC6tnffn1hUO+FLw2TMJ22aaIRo4Z2aYbnZB7
bDImRlhF65Q8dTArjr6KOhtsadNsnZjlMCYnF2kJ90DBtqZOWe2qCLIFaDrA8C1h
Bq5ndm6oST/yw7oobVbm4a61rAjaktIM8O0ZQD+w4AV0lUOFPH+KCe7N8sPENQoK
Yor03Zj2Ie1hf3PQhEYA5ZUDLsREwwJgbKM9eXQG0xRIFDtTHlAK2ijQeAHGLyT4
GyLi6fZy4RqI/ZfAqqgO7i/2KHi1CsCXIisO7vb78O5eoBy5gL4FuFRj6ZrzG4Tf
YjtUMRYHosQ9DHUQ38PbTXccit/ksH+gOt6lFBJ6RHSVxDO347A2ziUn/kDO8UZD
d3NrMpQ6S5FyRXcFUBlOdj76qfKcjVOhTsp1z9mwqiE4s/DMxA==
-----END CERTIFICATE-----`,
            }
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
            generateTitle: ({ doc }) => doc?.title || 'Untitled',
            generateDescription: async ({ doc, collectionSlug }) => {
                switch (collectionSlug) {
                    case 'blogs':
                    case 'notes':
                        return await generateBlogPostDescWithGemini(doc?.content)
                    case 'achievements':
                    case 'categories':
                    case 'certifications':
                    case 'educations':
                    case 'hackathons':
                    case 'licenses':
                    case 'projects':
                    case 'publications':
                    case 'researches':
                        return await generateBlogPostDescWithGemini(doc?.description)
                    default:
                        return 'You have to write description manually...'
                }
            },
            generateURL: async ({ doc, collectionSlug, req }) => {
                if (doc?.tenant) {
                    const tenant = await req.payload?.findByID({
                        collection: 'tenants',
                        id: doc?.tenant as number,
                        select: { domain: true }
                    })

                    const { RouteWithDocSlug } = generateRoute({
                        domain: tenant.domain as string,
                        slug: collectionSlug,
                        id: doc?.id,
                        docSlug: doc?.slug
                    })

                    return `${getServerSideURL()}/${RouteWithDocSlug}`
                }
                return getServerSideURL()
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