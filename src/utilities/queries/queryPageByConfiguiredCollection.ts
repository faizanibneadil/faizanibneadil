import { CollectionSlug, getPayload } from "payload";

import config from '@payload-config';
import { isNumber } from "payload/shared";
import { cacheLife, cacheTag } from "next/cache";
// import { draftMode } from "next/headers";

export const queryPageByConfiguredCollection = async ({
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
    const page = await payload.find({
        collection: 'pages',
        limit: 1,
        // draft,
        // overrideAccess: draft,
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
                },
                {
                    _status: {
                        equals: 'published'
                    }
                }
            ]
        },
    })

    return page?.docs?.at(0)
}