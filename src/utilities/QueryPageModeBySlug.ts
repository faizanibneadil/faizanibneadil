import { unstable_cache } from "next/cache"
import { getPayloadConfig } from "./getPayloadConfig"
import { ONE_MONTH_CACHE_TIME } from "../../constants"
import type { CollectionSlug } from "payload"

export const queryPageModeBySlug = (slug: CollectionSlug, domain: string) =>
    unstable_cache(
        async () => {
            const isNumericDomain = !Number.isNaN(Number(domain))
            const payload = await getPayloadConfig()
            const pages = await payload.find({
                collection: 'pages',
                limit: 1,
                pagination: false,
                depth: 0,
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
                select: {
                    content: {
                        pageMode: {
                            mode: true
                        },
                        configurations: {
                            slug: true
                        }
                    }
                }
            })

            return pages.docs?.at(0) || null
        },
        [`query-page-mode-by-${slug}-${domain}`],
        { revalidate: ONE_MONTH_CACHE_TIME }, // Cache for 1 month
    )()