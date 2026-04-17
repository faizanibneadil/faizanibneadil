import { CollectionSlug } from "payload"
import { getPayloadConfig } from "./getPayloadConfig"
import { isNumber } from "payload/shared"

export const queryDocumentViewBySlug = async ({ docSlug, domain, collectionSlug }: { collectionSlug: CollectionSlug, domain: string, docSlug: string }) => {
    const payload = await getPayloadConfig()
    const entity = await payload.find({
        collection: collectionSlug,
        limit: 1,
        pagination: false,
        where: {
            and: [
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    [isNumber(docSlug) ? 'id' : 'slug']: {
                        equals: docSlug
                    }
                },
            ],
        },
    })
    return entity?.docs?.at(0) || null
}