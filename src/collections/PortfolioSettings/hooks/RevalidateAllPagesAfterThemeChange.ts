import type { Config } from "@/payload-types";
import { revalidatePath } from "next/cache";
import type { FieldHook, FieldHookArgs } from "payload";

async function getPortfolioInfo(args: FieldHookArgs) {
    const { req, data } = args

    let portfolioId: number | null | undefined = null
    let portfolioSlug: string | null | undefined = null
    
    if (typeof data?.tenant === 'object') {
        portfolioId = data?.tenant?.id
        portfolioSlug = data?.tenant?.domain
    }

    if (typeof data?.tenant === 'number') {
        try {
            const tenant = await req.payload?.findByID({
                collection: 'tenants',
                id: data?.tenant,
                select: { domain: true },
                req
            })
            portfolioSlug = tenant?.domain
            portfolioId = tenant?.id
        } catch (error) {
            console.error('Something went wong to fetch tenant for invalidate all page', error)
        }
    }

    return { portfolioId, portfolioSlug }
}

export const RevalidateAllPagesAfterThemeChange: () => FieldHook<Config['collections']['portfolio-settings'], Config['collections']['portfolio-settings']['theme'], Config['collections']['portfolio-settings']> = () => {
    return async (args) => {
        const { value, previousValue, req } = args
        try {

            if (value === previousValue) {
                return value
            }

            const logger = req.payload.logger
            const payload = req.payload
            const ctx = req.context
            const routesToInvalidate: `/${string}`[] = []
            const { portfolioId, portfolioSlug } = await getPortfolioInfo(args)

            const pages = await payload.find({
                collection: 'pages',
                where: {
                    tenant: {
                        equals: portfolioId
                    }
                },
                select: {
                    slug: true
                },
                req
            })

            for (const { id, slug } of (pages.docs ?? [])) {
                if (portfolioId && id) {
                    routesToInvalidate.push(`/${portfolioId}/${id}`)
                }
                if (portfolioId && slug) {
                    routesToInvalidate.push(`/${portfolioId}/${slug}`)
                }
                if (portfolioSlug && id) {
                    routesToInvalidate.push(`/${portfolioSlug}/${id}`)
                }
                if (portfolioSlug && slug) {
                    routesToInvalidate.push(`/${portfolioSlug}/${slug}`)
                }
            }


            for (const route of routesToInvalidate) {
                revalidatePath(route)
                logger.info(`[ROUTE]:${route} is invalidated.`)
            }

            return value
        } catch (error) {
            console.log({ error }, 'Something went wrong to invalidate route.')
            return value
        }
    }
}