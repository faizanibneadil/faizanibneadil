'use server'
import { getPayloadConfig } from "./getPayloadConfig"

// TODO: wrap into next unstable cache for better performance
export const getRecentFormSubmissions = async ({tenantId}:{tenantId: string | number | undefined}) => {
    const payload = await getPayloadConfig()
    const submissions = await payload.find({
        collection: 'form-submissions',
        limit: 5,
        sort: '-createdAt',
        where: {
            'tenant.id': { equals: tenantId }
        }
    })
    return submissions?.docs
}