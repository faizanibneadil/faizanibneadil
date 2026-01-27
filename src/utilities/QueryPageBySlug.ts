import { unstable_cache } from "next/cache"
import { getPayloadConfig } from "./getPayloadConfig"
import { ONE_MONTH_CACHE_TIME } from "../../constants"
import type { CollectionSlug } from "payload"

export const queryPageBySlug = (slug: CollectionSlug, domain: string) =>
    unstable_cache(
        async () => {
            const isNumericDomain = !Number.isNaN(Number(domain))
            const payload = await getPayloadConfig()
            const pages = await payload.find({
                collection: 'pages',
                limit: 1,
                pagination: false,
                where: {
                    and: [
                        {
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
                                },
                            ]
                        },
                        {
                            slug: {
                                equals: slug
                            }
                        },
                    ],
                },
            })

            return pages.docs?.at(0) || null
        },
        [`query-page-by-${slug}-${domain}`],
        { revalidate: ONE_MONTH_CACHE_TIME }, // Cache for 1 month
    )()