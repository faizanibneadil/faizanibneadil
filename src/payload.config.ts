import path from 'path'
import { buildConfig, inMemoryKVAdapter } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Users } from '@/collections/Users'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { getServerSideURL } from './utilities/getURL'
import { blocks } from '@/blocks/config'
import { collections } from '@/collections/config'
import { plugins } from '@/plugins/config'
import { editorConfig } from '@/editor/config'

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
        dashboard: {
            widgets: [{
                ComponentPath: '@/widgets/config.ts#Visitors',
                slug: 'visitors',
                label: 'Visitors',
                maxWidth: 'full',
                minWidth: 'x-small'
            }, {
                ComponentPath: '@/widgets/config.ts#FormSubmissions',
                slug: 'formSubmissions',
                label: 'Form Submissions',
                maxWidth: 'full',
                minWidth: 'medium'
            }]
        },
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
                        fetchPriority: 'high',
                        loading: 'lazy',
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
                        fetchPriority: 'high',
                        loading: 'lazy',
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
    collections: [...collections],
    blocks: [...blocks],
    globals: [],
    editor: editorConfig,
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
        readReplicas: [process.env.DEV_NEON_READ_REPLICA_URI_1!, process.env.DEV_NEON_READ_REPLICA_URI_2!],
        pool: {
            connectionString: process.env.DEV_NEON_URI
        }
    }),
    // database-adapter-config-end
    sharp,
    onInit: async (payload) => {
        payload.logger.info('App is initialized ...')
        payload.logger.info('Finding home page in pages collection...')

    },
    plugins: [...plugins],
})