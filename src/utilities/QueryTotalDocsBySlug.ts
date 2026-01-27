import { unstable_cache } from "next/cache"
import { getPayloadConfig } from "./getPayloadConfig"
import { ONE_MONTH_CACHE_TIME } from "../../constants"
import type { CollectionSlug } from "payload"

export const queryTotalDocsBySlug = (slug: CollectionSlug, domain: string) =>
    unstable_cache(
        async () => {
            const isNumericDomain = !Number.isNaN(Number(domain))
            const payload = await getPayloadConfig()
            const docs = await payload.count({
                collection: slug,
                where: {
                    or: [
                        ...(isNumericDomain
                            ? [{
                                'tenant.id': {
                                    equals: Number(domain),
                                },
                            }]
                            : []),
                        {
                            'tenant.slug': {
                                equals: domain
                            }
                        }
                    ]
                },
            })

            return docs
        },
        [`query-total-docs-by-${slug}-${domain}`],
        { revalidate: ONE_MONTH_CACHE_TIME }, // Cache for 1 month
    )()