import React from "react"
import { getPayloadConfig } from "./getPayloadConfig"
import { Form, FormSubmission, Icon } from "@/payload-types"
import { sdk } from "@/lib/sdk"

// TODO: wrap into next unstable cache for better performance
export const getRecentFormSubmissions = React.cache(async ({ tenantId }: { tenantId: string | number | undefined }) => {
    try {
        const submissions = await sdk.find({
            collection: 'form-submissions',
            limit: 5,
            sort: '-createdAt',
            where: {
                'tenant.id': { equals: tenantId }
            }
        })
        return submissions?.docs
    } catch (error) {
        console.error("Something went wrong to fetch form submissions", error)
        return [] as FormSubmission[]
    }
})