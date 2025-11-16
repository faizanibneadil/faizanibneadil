import React from "react"
import { getPayloadConfig } from "./getPayloadConfig"
import { Icon } from "@/payload-types"

export const getIconById = React.cache(async ({ id }: { id: number }) => {
    try {
        const payload = await getPayloadConfig()
        const icon = await payload.findByID({ collection: 'icons', id })
        return icon
    } catch (error) {
        console.error("Something went wrong to fetch icon")
        return {} as Icon
    }
})