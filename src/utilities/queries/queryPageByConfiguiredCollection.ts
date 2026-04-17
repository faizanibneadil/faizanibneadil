import { CollectionSlug, getPayload } from "payload";

import config from '@payload-config';
import { isNumber } from "payload/shared";

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
        limit: 1,
        pagination: false,
        depth: 2,
        where: {
            and: [
                {
                    configuredCollectionSlug: {
                        equals: collectionSlug
                    }
                },
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                }
            ]
        },
    })

    return page?.docs?.at(0)
}