import { unstable_cache } from "next/cache"
import { getPayloadConfig } from "./getPayloadConfig"
import { ONE_MONTH_CACHE_TIME } from "../../constants"

export const queryRootPageByDomain = (domain: string) =>
    unstable_cache(
        async () => {
            const payload = await getPayloadConfig()
            const isNumericDomain = !Number.isNaN(Number(domain))
            const __slug = await payload.find({
                collection: 'pages',
                where: {
                    and: [
                        {
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
                        },
                        {
                            isRootPage: {
                                equals: true
                            }
                        }
                    ],
                },
                depth: 0,
                select: {
                    slug: true
                }
            })
            return __slug?.docs?.at(0)?.slug
        },
        [`query-root-page-by-${domain}`],
        { revalidate: ONE_MONTH_CACHE_TIME }, // Cache for 1 month
    )()