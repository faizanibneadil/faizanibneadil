import type { TInvalidatorTask } from "@/payload-types";
import { revalidatePath } from "next/cache";
import type { Endpoint } from "payload";

export const InvalidateRoute: Endpoint = {
    method: 'post',
    path: '/invalidate',
    handler: async (req) => {
        const logger = req.payload.logger
        const payload = req.payload

        let body: TInvalidatorTask['input'] = {}
        let portfolioSlug: string | null | undefined = null
        let portfolioId: number | null | undefined = null
        let pageSlug: string | null | undefined = null
        let pageId: number | null | undefined = null
        let routesToInvalidate: `/${string}`[] = []

        try {
            if (typeof req.json === 'function') {
                body = await req.json()
            }
        } catch (error) {
            // swallow error, data is already empty object
        }

        if (!body?.tenant) {
            throw new Error('Tenant is required.')
        }

        if (typeof body?.tenant === 'object') {
            portfolioSlug = body?.tenant?.domain
            portfolioId = body?.tenant?.id
        } else if (typeof body?.tenant === 'number') {
            try {
                const tenant = await payload?.findByID({
                    collection: 'tenants',
                    id: body?.tenant,
                    select: { domain: true },
                    req
                })
                portfolioSlug = tenant?.domain
                portfolioId = tenant?.id
            } catch (error) {
                logger.error({ error }, 'Something went wrong to fetch domain for invalidating the route.')
            }
        }


        if (typeof body?.page === 'object') {
            pageSlug = body?.page?.slug
            pageId = body?.page?.id
        } else if (typeof body?.page === 'number') {
            try {
                const page = await payload?.findByID({
                    collection: 'pages',
                    id: body?.page,
                    select: { slug: true },
                    req
                })
                pageSlug = page.slug
                pageId = page?.id
            } catch (error) {
                logger.error({ error }, 'Something went wrong to fetch page for invalidating the route.')
            }
        }

        if (portfolioId) {
            routesToInvalidate.push(`/${portfolioId}`)
        }

        if (!body?.invalidateAllRoutes) {
            if (portfolioSlug && pageSlug) {
                // TODO: ye pettren hook se aasakta he like hook api ko dega 
                // array of routes like: ['/{{portfolioSlug}}/{{pageSlug}}/{{entitySlug}}'] 
                // phir ak str.replace fn se variables ko actual values se replace kr dogy
                routesToInvalidate.push(`/${portfolioSlug}/${pageSlug}`)
            }

            if (portfolioId && pageId) {
                routesToInvalidate.push(`/${portfolioId}/${pageId}`)
            }

            if (body?.invalidateRootRoute) {
                routesToInvalidate.push(`/${portfolioSlug}`)
            }
        }

        if (body?.invalidateAllRoutes) {
            try {
                const pages = await payload.find({
                    collection: 'pages',
                    where: {
                        tenant: {
                            equals: portfolioId
                        }
                    },
                    select: {
                        slug: true
                    }
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

            } catch (error) {
                logger.error({ error }, 'Something went wrong to fetch all pages slugs for invalidating all routes')
            }
        }


        for (const route of routesToInvalidate) {
            revalidatePath(route)
            logger.info(`[ROUTE]:${route} is invalidated.`)
        }

        return Response.json({ success: true, message: `[ROUTES]:${routesToInvalidate} is invalidated.` })
    }
}