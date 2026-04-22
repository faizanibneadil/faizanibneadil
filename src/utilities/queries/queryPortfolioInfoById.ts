import config from '@payload-config'
import { getPayload } from 'payload'

export const queryPortfolioInfoById = async ({tenantID}:{tenantID:number}) => {
    const payload = await getPayload({config})
    const portfolioInfo = await payload.findByID({
        collection: 'tenants',
        id:tenantID
    })

    return portfolioInfo
}