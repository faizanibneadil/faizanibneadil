import React from "react"
import { getPayloadConfig } from "./getPayloadConfig"

export const getIconById = React.cache(async ({ id }: { id: number }) => {
    const payload = await getPayloadConfig()
    const icon = await payload.findByID({ collection: 'icons', id })
    return icon
})