// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
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

import { Hero } from '@/blocks/Hero'
import { Contact } from '@/blocks/Contact'
import { Education } from '@/blocks/Education'
import { Project } from '@/blocks/Project'
import { Skills } from '@/blocks/Skill'
import { Experiances } from '@/blocks/Experiances'
import { About } from '@/blocks/About'

import { Menu } from '@/collections/Menu'
import { Socials } from '@/collections/Socials'

import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { Config } from './payload-types'
import { isSuperAdmin } from './access/isSuperAdmin'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [
        Users,
        Media,
        Notes,
        Blogs,
        Pages,
        Projects,
        Tenants,
        Menu,
        Socials
    ],
    blocks: [Hero, Contact, Education, Project, Skills, Experiances, About],
    globals: [],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // database-adapter-config-start
    db: postgresAdapter({
        pool: {
            connectionString: process.env.SUPABASE_URI
            //             max: 20,
            //             log: (...messages) => {
            //                 console.log({ PG_LOGS: messages })
            //             },
            //             user: process.env.PG_USER,
            //             password: process.env.PG_PASSWORD,
            //             database: process.env.PG_DATABASE,
            //             port: Number.parseInt(process.env.PG_PORT || ''),
            //             host: process.env.PG_HOST,
            //             ssl: {
            //                 rejectUnauthorized: true,
            //                 ca: `-----BEGIN CERTIFICATE-----
            // MIIEQTCCAqmgAwIBAgIUSmPY0sTLDM3ArNxjjYzHtQ7WIrQwDQYJKoZIhvcNAQEM
            // BQAwOjE4MDYGA1UEAwwvMzIzYjZiYTEtYTQxZC00N2JkLTg5NDgtNDEwYTMxODQ1
            // MzU1IFByb2plY3QgQ0EwHhcNMjMxMjE2MTQ1NzU4WhcNMzMxMjEzMTQ1NzU4WjA6
            // MTgwNgYDVQQDDC8zMjNiNmJhMS1hNDFkLTQ3YmQtODk0OC00MTBhMzE4NDUzNTUg
            // UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJz7wSJd
            // 1C+Qp9tvmDGwjta4/OTVdPMFCD02M0Sjj/ToKcbVX4uC6dSzCmOn3AIZxeBkQDVA
            // a2tYYwSwC47OPtRMru/mwnFw71OkSkmd7pjk/5xcm5HnauS/RMYI6ZZtVL+uC+TI
            // MB+QGC0jIH63UR6BblZSSkyPwFMMvkEY6GClORcxAUDbLjavqOeUxUAguRtXcOoG
            // dKtCnTlTwRjm2rJCpY3r8XIiCIH2e139eiiBkWScBexpetCqIfUihTfvEW3AETd4
            // QBA0uj8w4aWgRK9i4og+b0Kp2T6JoYG+eRtuxcyxaMOuzscUVZbhdRyv7VOp5iRd
            // WaRwslRmiG5WCeihAu/3Yhg75o93eB8RomCxeOWplZVxl4duiZZoXTarrwz/6jGZ
            // pIBW6F84Ep0ccgjpjPNxQ25yLTuE2W+TKZUM/z1bA+JYeKP0Sdt2/3whXpPHZP6e
            // +pT45Sqhs15Hso1jb5lyk/FPd6NhOcjVCw0wJqhHTsXDYfRulvDVlDvScQIDAQAB
            // oz8wPTAdBgNVHQ4EFgQUucgcRhXEJJNTnODboBUVCQZJWKMwDwYDVR0TBAgwBgEB
            // /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHq+SXfK9QvWciuh
            // ea3TMokYhqMOZbwsqzA94oTMFp26Bv85ceBh4I6nIMIuQNWZYZ26VLVKVpNYAEeW
            // 6JoslLkOjVi/8x9Z8SAjnKH8l8KUC6tnffn1hUO+FLw2TMJ22aaIRo4Z2aYbnZB7
            // bDImRlhF65Q8dTArjr6KOhtsadNsnZjlMCYnF2kJ90DBtqZOWe2qCLIFaDrA8C1h
            // Bq5ndm6oST/yw7oobVbm4a61rAjaktIM8O0ZQD+w4AV0lUOFPH+KCe7N8sPENQoK
            // Yor03Zj2Ie1hf3PQhEYA5ZUDLsREwwJgbKM9eXQG0xRIFDtTHlAK2ijQeAHGLyT4
            // GyLi6fZy4RqI/ZfAqqgO7i/2KHi1CsCXIisO7vb78O5eoBy5gL4FuFRj6ZrzG4Tf
            // YjtUMRYHosQ9DHUQ38PbTXccit/ksH+gOt6lFBJ6RHSVxDO347A2ziUn/kDO8UZD
            // d3NrMpQ6S5FyRXcFUBlOdj76qfKcjVOhTsp1z9mwqiE4s/DMxA==
            // -----END CERTIFICATE-----`,
            //             }
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
        multiTenantPlugin<Config>({
            collections: {
                pages: {},
                blogs: {},
                media: {},
                notes: {},
                projects: {},
                menu: { isGlobal: true },
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