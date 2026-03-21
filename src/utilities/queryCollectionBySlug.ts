import { CollectionSlug } from "payload"
import { cache } from "react"
import { getPayloadConfig } from "./getPayloadConfig"

export const queryCollectionBySlug = cache(async (slug: CollectionSlug, domain: string) => {
    try {
        const isNumericDomain = !Number.isNaN(Number(domain))
        const payload = await getPayloadConfig()
        const result = await payload.find({
            collection: slug!,
            pagination: true,
            where: {
                or: [
                    {
                        'tenant.slug': {
                            equals: domain
                        }
                    },
                    ...(isNumericDomain
                        ? [{
                            'tenant.id': {
                                equals: Number(domain),
                            },
                        }]
                        : []),
                ]
            }
        })
        return result || null
    } catch (error) {
        console.error(`Something went wrong to fetch collection from ${slug} of ${domain}`, error)
        return null
    }
})