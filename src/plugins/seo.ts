import { generateRoute } from "@/utilities/generateRoute";
import { getServerSideURL } from "@/utilities/getURL";
import { seoGemini } from "@/utilities/seo-gemini";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";


export const seo = seoPlugin({
    collections: [
        // 'achievements',
        // 'blogs',
        // 'categories',
        // 'certifications',
        // 'educations',
        // 'hackathons',
        // 'licenses',
        // 'notes',
        // 'pages',
        // 'projects',
        // 'publications',
        // 'researches',
    ],
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
        } catch (error) {
            payload.logger.error(error, `Something went wrong when generating seo title using ${collectionSlug}`)
            return fallbackTitle
        }

    },
    generateDescription: async ({ doc, collectionSlug,req: { payload } }) => {
        try {
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
        } catch (error) {
            payload.logger.error(error,`Somwthing went wrong when generating seo description using gemini.`)
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
})