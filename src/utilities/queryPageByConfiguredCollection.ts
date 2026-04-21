import { CollectionSlug, getPayload } from "payload"
import config from '@payload-config'
import { isNumber } from "payload/shared"
export const queryPageByConfiguredCollection = async ({
    collectionSlug,
    domain
}: {
    collectionSlug: CollectionSlug,
    domain: string
}) => {
    const payload = await getPayload({ config })
    const page = await payload.find({
        collection: 'pages',
        pagination: false,
        limit: 1,
        where: {
            and: [
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    configuredCollectionSlug: {
                        equals: collectionSlug
                    }
                }
            ]
        }
    })
}