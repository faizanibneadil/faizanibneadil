import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
// import { draftMode } from 'next/headers'
import { CollectionSlug, getPayload } from 'payload'
import { isNumber } from 'payload/shared'
export const queryCollectionBySlug = async ({
    collectionSlug,
    domain
}: {
    collectionSlug: CollectionSlug,
    domain: string
}) => {
    "use cache"
    cacheLife('weeks')
    cacheTag(`${domain}_${collectionSlug}`)

    // const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: collectionSlug,
        // draft,
        // overrideAccess: draft,
        pagination: true,
        depth: 2,
        where: {
            and: [
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
        }
    })

    return result
}
