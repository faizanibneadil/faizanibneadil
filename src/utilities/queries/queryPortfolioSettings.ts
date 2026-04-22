import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { isNumber } from 'payload/shared'

export const queryPortfolioSettings = async ({
    domain
}: {
    domain: string
}) => {
    const payload = await getPayload({ config })
    const settings = await payload.find({
        collection: 'portfolio-settings',
       
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        }
    })

    return settings?.docs?.at(0)
}