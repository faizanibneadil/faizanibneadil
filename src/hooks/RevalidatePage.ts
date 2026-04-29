import { cache } from 'react'
import type { Page } from '@/payload-types'
import type { AppCollectionAfterChangeHook, AppCollectionAfterDeleteHook } from '@/types'
import type { CollectionSlug, PayloadRequest } from 'payload'
import { generateRoute } from '@/utilities/generateRoute'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { revalidatePath, revalidateTag } from 'next/cache'
import { queryPortfolioInfoById } from '@/utilities/queries/queryPortfolioInfoById'


const formatRoute = ({
    collectionSlug,
    docSlug,
    portfolio
}: {
    portfolio: string | number,
    collectionSlug: (string & {}) | null | undefined | CollectionSlug,
    docSlug: string
}) => [`/${portfolio}/${collectionSlug}/${docSlug}`, `/${portfolio}/${collectionSlug}`, `/${portfolio}`]

export const RevalidatePageAfterChange: AppCollectionAfterChangeHook<Page, {
    invalidateRootRoute?: boolean
}> = ({ invalidateRootRoute }) => {
    return async ({
        doc,
        previousDoc,
        req,
        collection,
        context
    }) => {
        const portfolioSlug = typeof doc?.tenant === 'number'
            ? (await queryPortfolioInfoById({ tenantID: doc?.tenant }))?.domain
            : doc?.tenant?.domain

        const portfolioId = typeof doc?.tenant === 'object'
            ? doc?.tenant?.id
            : doc?.tenant

        const collectionSlug = collection.slug === 'pages'
            ? doc?.enableCollection
                ? doc?.configuredCollectionSlug
                : collection.slug
            : collection.slug

        const paths: string[] = []

        if (!context.disableRevalidate) {
            if (doc?._status === 'published') {
                paths.push(...formatRoute({ portfolio: portfolioId!, collectionSlug, docSlug: doc?.slug }))
                paths.push(...formatRoute({ portfolio: portfolioSlug!, collectionSlug, docSlug: doc?.slug }))
            }

            if (previousDoc?._status === 'published' && doc?._status !== 'published') {
                paths.push(...formatRoute({ portfolio: portfolioId!, collectionSlug, docSlug: previousDoc?.slug }))
                paths.push(...formatRoute({ portfolio: portfolioSlug!, collectionSlug, docSlug: previousDoc?.slug }))
            }
        }

        if (Boolean(paths.length)) {
            const uniquePaths = [...new Set(paths)]
            uniquePaths.forEach(path => {
                req.payload.logger.info(`invalidating => ${path}`)
                const pathToTag = path?.split('/').filter(Boolean).join('_')
                // console.log({ pathToTag })
                revalidatePath(path)
                revalidateTag(pathToTag, 'max')
            })
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
        collection,
        context
    }) => {
        const portfolioSlug = typeof doc?.tenant === 'number'
            ? (await queryPortfolioInfoById({ tenantID: doc?.tenant }))?.domain
            : doc?.tenant?.domain

        const portfolioId = typeof doc?.tenant === 'object'
            ? doc?.tenant?.id
            : doc?.tenant

        const collectionSlug = collection.slug === 'pages'
            ? doc?.enableCollection
                ? doc?.configuredCollectionSlug
                : collection.slug
            : collection.slug

        const paths: string[] = []

        if (!context.disableRevalidate) {
            paths.push(...formatRoute({ portfolio: portfolioId!, collectionSlug, docSlug: doc?.slug }))
            paths.push(...formatRoute({ portfolio: portfolioSlug!, collectionSlug, docSlug: doc?.slug }))

        }

        if (Boolean(paths.length)) {
            const uniquePaths = [...new Set(paths)]
            uniquePaths.forEach(path => {
                req.payload.logger.info(`invalidating => ${path}`)
                revalidatePath(path)
            })
        }

        return doc
    }
}