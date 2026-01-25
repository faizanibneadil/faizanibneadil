import { unstable_cache } from "next/cache"
import { getPayloadConfig } from "./getPayloadConfig"
import { getMediaUrl } from "./getURL"
import { ONE_MONTH_CACHE_TIME } from "../../constants"

export const getProfileAvatarByDomain = (domain: string) =>
    unstable_cache(
        async () => {
            try {
                const payload = await getPayloadConfig()
                const isNumericDomain = !Number.isNaN(Number(domain))
                const avatar = await payload.find({
                    collection: "users",
                    where: {
                        or: [
                            {
                                'tenants.tenant.slug': {
                                    equals: domain
                                }
                            },
                            ...(isNumericDomain
                                ? [{
                                    'tenants.tenant.id': {
                                        equals: Number(domain),
                                    },
                                }]
                                : []),
                        ]
                    },
                    select: { profile: true }
                })

                return getMediaUrl(avatar.docs.at(0)?.profile)
            } catch (error) {
                console.error('Failed to fetch integration:', error)
                return null
            }
        },
        [`get-profile-avatar-${domain}`],
        { revalidate: ONE_MONTH_CACHE_TIME }, // Cache for 1 month
    )()