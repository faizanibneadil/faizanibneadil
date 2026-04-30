import config from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag, unstable_cache } from 'next/cache'
import { isNumber } from 'payload/shared'

export const queryRedirectsByDomain = async ({ domain}:{domain:string}) => {
    'use cache'
    cacheLife('weeks')
    cacheTag(`redirects_${domain}`)


    const payload = await getPayload({ config })

    const { docs: redirects } = await payload.find({
        collection: 'redirects',
        limit: 0,
        pagination: false,
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        }
    })
    return redirects
}
