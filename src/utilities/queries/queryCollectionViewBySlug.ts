import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
// import { draftMode } from 'next/headers'
import { CollectionSlug, getPayload } from 'payload'
import { isNumber } from 'payload/shared'
export const queryCollectionViewBySlug = async ({
    collectionSlug,
    slug,
    domain
}: {
    collectionSlug: CollectionSlug,
    slug: string,
    domain: string
}) => {
    "use cache"
    cacheLife('weeks')
    cacheTag(`${domain}_${collectionSlug}_${slug}`)
    // const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: collectionSlug,
        // draft,
        // overrideAccess: draft,
        pagination: false,
        limit: 1,
        depth: 2,
        where: {
            and: [
                {
                    slug: {
                        equals: slug,
                    },
                },
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    _status: {
                        equals: 'published'
                    }
                }
            ]
        },
    })

    return result?.docs?.at(0) || null
}