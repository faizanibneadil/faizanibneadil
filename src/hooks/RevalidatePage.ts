import { Page } from '@/payload-types'
import { AppCollectionAfterChangeHook, AppCollectionAfterDeleteHook } from '@/types'
import { generateRoute } from '@/utilities/generateRoute'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { revalidatePath, revalidateTag } from 'next/cache'
import { BasePayload } from 'payload'
import React from 'react'

const getDomain = React.cache(async ({ payload, headers }: { payload: BasePayload, headers: Headers }) => {
    try {
        const tenant = await payload?.findByID({
            collection: 'tenants',
            id: getTenantFromCookie(headers, 'number') as number,
            select: { domain: true }
        })
        return tenant?.domain || null
    } catch (error) {
        payload.logger.warn(error, 'Something went wrong to fetch domain')
        return null
    }
})

export const RevalidatePageAfterChange: AppCollectionAfterChangeHook<Page, {
    invalidateRootRoute?: boolean
}> = ({ invalidateRootRoute }) => {
    return async ({
        doc,
        previousDoc,
        req: { payload, context, headers },
        collection,
    }) => {
        const domain = await getDomain({ headers, payload })
        if (domain) {
            const { RootRoute, Route } = generateRoute({
                domain,
                slug: collection?.slug === 'pages' ? doc?.slug : collection?.slug
            })
            if (!context.disableRevalidate) {
                invalidateRootRoute && payload.logger.info(`Revalidating page at [PATH]:${RootRoute}`)
                invalidateRootRoute && revalidatePath(RootRoute)
                payload.logger.info(`Revalidating page at [PATH]:${Route}`)
                revalidatePath(Route)
                // revalidateTag('pages-sitemap','max')
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
        req: { context, payload, headers },
        collection
    }) => {
        const domain = await getDomain({ headers, payload })
        if(domain){
            const { RootRoute, Route } = generateRoute({
                domain,
                slug: collection?.slug === 'pages' ? doc?.slug : collection?.slug
            })
            if (!context.disableRevalidate) {
                invalidateRootRoute && payload.logger.info(`Revalidating page at [PATH]:${RootRoute}`)
                invalidateRootRoute && revalidatePath(RootRoute)
                payload.logger.info(`Revalidating page at [PATH]:${Route}`)
                revalidatePath(Route)
                // revalidateTag('pages-sitemap','max')
            }
        }

        return doc
    }
}