import config from '@payload-config'
import { CollectionSlug, getPayload } from 'payload'
import { isNumber } from 'payload/shared'

export const queryCollectionByCollectionSlug = async ({ collectionSlug, domain }: { collectionSlug: CollectionSlug, domain: string }) => {
    const payload = await getPayload({ config })
    const collection = await payload.find({
        collection: collectionSlug,
        pagination: true,
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        }
    })

    return collection
}