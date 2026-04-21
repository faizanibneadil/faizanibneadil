import { isNumber } from "payload/shared"
import { getPayloadConfig } from "./getPayloadConfig"

// TODO: wrap into next unstable cache for better performance
export const getNavbarMenuItems = async ({ domain }: { domain: string }) => {
    const payload = await getPayloadConfig()
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

// TODO: wrap into next unstable cache for better performance
export const getNavbarSocialMenuItems = async ({ domain }: { domain: string }) => {
    const payload = await getPayloadConfig()
    const socials = (await payload.find({
        collection: 'socials',
        limit: 1,
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        }
    }))?.docs?.at(0)
    return socials
}