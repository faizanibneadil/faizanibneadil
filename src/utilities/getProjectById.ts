import React from "react"
import { getPayloadConfig } from "./getPayloadConfig"

// TODO: wrap into next unstable cache for better performance
export const getProjectById = React.cache(async ({ id }: { id: number }) => {
    const payload = await getPayloadConfig()
    const icon = await payload.findByID({ collection: 'projects', id })
    return icon
})