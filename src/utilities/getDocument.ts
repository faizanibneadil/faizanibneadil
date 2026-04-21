import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { isNumber } from 'payload/shared'

type Collection = keyof Config['collections']

async function getDocument(domain: string, collection: Collection, slug: string, depth = 0) {
    const payload = await getPayload({ config: configPromise })

    const page = await payload.find({
        collection,
        depth,
        where: {
            slug: {
                equals: slug,
            },
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        },
    })

    return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (domain:string,collection: Collection, slug: string) =>
    unstable_cache(async () => getDocument(domain,collection, slug), [domain,collection, slug], {
        tags: [`${domain}_${collection}_${slug}`],
    })