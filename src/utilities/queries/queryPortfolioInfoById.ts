import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

export const queryPortfolioInfoById = async ({tenantID}:{tenantID:number}) => {
    "use cache"
    cacheLife('weeks')
    cacheTag(String(tenantID))

    const payload = await getPayload({config})
    const portfolioInfo = await payload.findByID({
        collection: 'tenants',
        id:tenantID
    })

    return portfolioInfo
}