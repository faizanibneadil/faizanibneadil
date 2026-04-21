import config from '@payload-config'
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
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: collectionSlug,
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
                }
            ]
        },
    })

    return result?.docs?.at(0) || null
}