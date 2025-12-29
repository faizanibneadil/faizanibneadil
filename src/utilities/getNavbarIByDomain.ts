import React from "react"
import { getPayloadConfig } from "./getPayloadConfig"
import type { Menu, Social } from "@/payload-types"

// TODO: wrap into next unstable cache for better performance
export const getNavbarMenuItems = React.cache(async ({ domain }: { domain: string }) => {
    try {
        const payload = await getPayloadConfig()
        const menu = (await payload.find({
            collection: 'menus',
            limit: 1,
            where: {
                'tenant.slug': {
                    equals: domain
                }
            }
        }))?.docs?.at(0)
        return menu
    } catch (error) {
        console.error("Something went wrong to fetch navbar menu items", error)
        return {} as Menu
    }
})

// TODO: wrap into next unstable cache for better performance
export const getNavbarSocialMenuItems = React.cache(async ({ domain }: { domain: string }) => {
    try {
        const payload = await getPayloadConfig()
        const socials = (await payload.find({
            collection: 'socials',
            limit: 1,
            where: {
                'tenant.slug': {
                    equals: domain
                }
            }
        }))?.docs?.at(0)
        return socials
    } catch (error) {
        console.error("Something went wrong to fetch navbar social items", error)
        return {} as Social
    }
})