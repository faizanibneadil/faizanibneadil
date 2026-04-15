import { unstable_cache } from "next/cache"
import { getPayloadConfig } from "./getPayloadConfig"
import { ONE_MONTH_CACHE_TIME } from "../../constants"
import config from '@payload-config'
import { getPayload } from "payload"
import { isNumber } from "payload/shared"

export const queryThemeByDomain = async ({ domain }: { domain: string }) => {
    const payload = await getPayload({ config })
    const themeConfig = await payload.find({
        collection: 'portfolio-settings',
        select: {
            theme: true
        },
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: Number(domain),
            },
        },
        depth: 0,
    })

    const theme = themeConfig?.docs?.at(0)
    const themeID = typeof theme === 'object' ? theme.id : theme

    return themeID ?? 1
}