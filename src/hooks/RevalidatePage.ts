import { cache } from 'react'
import type { Page } from '@/payload-types'
import type { AppCollectionAfterChangeHook, AppCollectionAfterDeleteHook } from '@/types'
import type { PayloadRequest } from 'payload'
import { generateRoute } from '@/utilities/generateRoute'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { revalidatePath, revalidateTag } from 'next/cache'

const getDomain = cache(async (req: PayloadRequest, tenantId?: number) => {
    try {
        const tenant = await req.payload?.findByID({
            collection: 'tenants',
            id: tenantId || getTenantFromCookie(req.headers, 'number') as number,
            select: { domain: true },
            req
        })
        return tenant?.domain
    } catch (error) {
        req.payload.logger.warn(error, 'Something went wrong to fetch domain')
        return null
    }
})

export const RevalidatePageAfterChange: AppCollectionAfterChangeHook<Page, {
    invalidateRootRoute?: boolean
}> = ({ invalidateRootRoute }) => {
    return async ({
        doc,
        previousDoc,
        req,
        collection,
    }) => {
        const domain = typeof doc?.tenant === 'number'
            ? await getDomain(req, doc?.tenant)
            : doc?.tenant?.domain

        if (domain) {
            const { RootRoute, Route } = generateRoute({
                domain,
                slug: collection?.slug === 'pages' ? doc?.slug : collection?.slug
            })
            if (!req.context.disableRevalidate) {
                invalidateRootRoute && req.payload.logger.info(`Revalidating page at [PATH]:${RootRoute}`)
                invalidateRootRoute && revalidatePath(RootRoute)
                req.payload.logger.info(`Revalidating page at [PATH]:${Route}`)
                revalidatePath(Route)
                revalidateTag('pages-sitemap', 'max')
            }
        }
        return doc
    }
}

export const RevalidatePageAfterDelete: AppCollectionAfterDeleteHook<Page, {
    invalidateRootRoute?: boolean
}> = ({ invalidateRootRoute }) => {
    return async ({
        doc,
        req,
        collection
    }) => {
        const domain = typeof doc?.tenant === 'number'
            ? await getDomain(req, doc?.tenant)
            : doc?.tenant?.domain
        if (domain) {
            const { RootRoute, Route } = generateRoute({
                domain,
                slug: collection?.slug === 'pages' ? doc?.slug : collection?.slug
            })
            if (!req.context.disableRevalidate) {
                invalidateRootRoute && req.payload.logger.info(`Revalidating page at [PATH]:${RootRoute}`)
                invalidateRootRoute && revalidatePath(RootRoute)
                req.payload.logger.info(`Revalidating page at [PATH]:${Route}`)
                revalidatePath(Route)
                revalidateTag('pages-sitemap', 'max')
            }
        }

        return doc
    }
}