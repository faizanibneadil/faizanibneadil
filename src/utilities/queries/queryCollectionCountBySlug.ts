import config from '@payload-config'
import { draftMode } from 'next/headers'
import { CollectionSlug, getPayload } from 'payload'
import { isNumber } from 'payload/shared'

export const queryCollectionCountBySlug = async ({
    collectionSlug,
    domain
}: {
    collectionSlug: CollectionSlug,
    domain: string
}) => {
    const payload = await getPayload({ config })

    const result = await payload.count({
        collection: collectionSlug,
        where: {
            and: [
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    },
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