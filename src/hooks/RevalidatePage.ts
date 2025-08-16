import { Page } from '@/payload-types'
import { AppCollectionAfterChangeHook, AppCollectionAfterDeleteHook } from '@/types'
import { generateRoute } from '@/utilities/generateRoute'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { revalidatePath, revalidateTag } from 'next/cache'
import { BasePayload } from 'payload'
import React from 'react'

const getDomain = React.cache(async ({ payload, headers }: { payload: BasePayload, headers: Headers }) => {
    const tenant = await payload?.findByID({
        collection: 'tenants',
        id: getTenantFromCookie(headers, 'number') as number,
        select: { domain: true }
    })

    return tenant?.domain || null
})

export const RevalidatePageAfterChange: AppCollectionAfterChangeHook<Page> = ({ invalidateRootRoute }) => {
    return async ({
        doc,
        previousDoc,
        req: { payload, context, headers },
        collection,
    }) => {
        const domain = await getDomain({ headers, payload })
        const { RootRoute, Route } = generateRoute({
            domain,
            slug: collection?.slug === 'pages' ? doc?.slug : collection?.slug
        })
        if (!context.disableRevalidate) {
            if (doc?._status === 'published') {
                invalidateRootRoute && payload.logger.info(`Revalidating page at [PATH]:${RootRoute}`)
                invalidateRootRoute && revalidatePath(RootRoute)
                payload.logger.info(`Revalidating page at [PATH]:${Route}`)
                revalidatePath(Route)
                revalidateTag('pages-sitemap')
            }
            // If the page was previously published, we need to revalidate the old path
            if (previousDoc?._status === 'published' && doc._status !== 'published') {
                invalidateRootRoute && payload.logger.info(`Revalidating page at [PATH]:${RootRoute}`)
                invalidateRootRoute && revalidatePath(RootRoute)
                payload.logger.info(`Revalidating page at [PATH]:${Route}`)
                revalidatePath(Route)
                revalidateTag('pages-sitemap')
            }
        }
        return doc
    }
}

// export const RevalidateRootPageAfterChange: CollectionAfterChangeHook<Page> = ({
//     doc,
//     previousDoc,
//     req: { payload, context },
// }) => {
//     if (!context.disableRevalidate) {
//         if (doc._status === 'published') {
//             const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

//             payload.logger.info(`Revalidating page at path: ${path}`)

//             revalidatePath(path)
//             revalidateTag('pages-sitemap')
//         }

//         // If the page was previously published, we need to revalidate the old path
//         if (previousDoc?._status === 'published' && doc._status !== 'published') {
//             const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

//             payload.logger.info(`Revalidating old page at path: ${oldPath}`)

//             revalidatePath(oldPath)
//             revalidateTag('pages-sitemap')
//         }
//     }
//     return doc
// }

export const RevalidatePageAfterDelete: AppCollectionAfterDeleteHook = ({ invalidateRootRoute }) => {
    return async ({
        doc,
        req: { context, payload, headers },
        collection
    }) => {
        const domain = await getDomain({ headers, payload })
        const { RootRoute, Route } = generateRoute({
            domain,
            slug: collection?.slug === 'pages' ? doc?.slug : collection?.slug
        })
        if (!context.disableRevalidate) {
            invalidateRootRoute && payload.logger.info(`Revalidating page at [PATH]:${RootRoute}`)
            invalidateRootRoute && revalidatePath(RootRoute)
            payload.logger.info(`Revalidating page at [PATH]:${Route}`)
            revalidatePath(Route)
            revalidateTag('pages-sitemap')
        }

        return doc
    }
}
// export const RevalidateRootPageAfterDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
//     if (!context.disableRevalidate) {
//         const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
//         revalidatePath(path)
//         revalidateTag('pages-sitemap')
//     }

//     return doc
// }