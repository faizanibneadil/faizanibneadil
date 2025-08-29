// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

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
            return [...defaultFeatures, ...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
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
            connectionString: process.env.SUPABASE_URI
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