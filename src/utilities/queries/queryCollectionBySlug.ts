import config from '@payload-config'
import { CollectionSlug, getPayload } from 'payload'
import { isNumber } from 'payload/shared'
export const queryCollectionBySlug = async ({
    collectionSlug,
    domain
}: {
    collectionSlug: CollectionSlug,
    domain: string
}) => {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: collectionSlug,
        pagination: true,
        depth: 2,
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        }
    })

    return result
}