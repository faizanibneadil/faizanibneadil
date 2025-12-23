import React from "react"
import { getPayloadConfig } from "./getPayloadConfig"
import { Form, Icon } from "@/payload-types"
import { sdk } from "@/lib/sdk"

export const getFormByFormId = React.cache(async ({ id }: { id: number }) => {
    try {
        const form = await sdk.findByID({ collection: 'forms', id })
        return form
    } catch (error) {
        console.error("Something went wrong to fetch icon")
        return {} as Form
    }
})