import { unstable_cache } from "next/cache"
import { getPayloadConfig } from "./getPayloadConfig"
import { ONE_MONTH_CACHE_TIME } from "../../constants"

export const queryThemeByDomain = (domain: string) =>
    unstable_cache(
        async () => {
            const isNumericDomain = !Number.isNaN(Number(domain))
            const payload = await getPayloadConfig()
            const themeConfig = await payload.find({
                collection: 'portfolio-settings',
                select: {
                    theme: true
                },
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
                        },
                    ]
                },
                depth: 0,
            })

            const theme = themeConfig?.docs?.at(0)?.theme as number

            return theme ?? 3
        },
        [`query-theme-by-${domain}`],
        { revalidate: ONE_MONTH_CACHE_TIME }, // Cache for 1 month
    )()