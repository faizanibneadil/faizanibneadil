import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { isNumber } from "payload/shared"

// TODO: wrap into next unstable cache for better performance
export const queryMenu = async ({ domain }: { domain: string }) => {
    "use cache"
    cacheLife('weeks')
    cacheTag(String(domain))
    const payload = await getPayload({config})
    const menu = await payload.find({
        collection: 'menus',
        limit: 1,
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        }
    })
    return menu?.docs?.at(0)
}