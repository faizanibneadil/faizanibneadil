// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
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
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        components: {
            graphics: {
                Logo: '@/components/branding.tsx#Branding',
                Icon: '@/components/branding-icon.tsx#BrandingIcon'
            }
        }
    },
    cors: [getServerSideURL()].filter(Boolean),
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
            return [...defaultFeatures, ...rootFeatures, FixedToolbarFeature()]
        },
    }),
    secret: process.env.PAYLOAD_SECRET || '',
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
                access: {
                    create: superAdminOrTenantAdminAccess,
                    delete: superAdminOrTenantAdminAccess,
                    read: () => true,
                    update: superAdminOrTenantAdminAccess,
                }
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