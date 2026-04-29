import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { isNumber } from 'payload/shared'

export const querySocials = async ({ domain }: { domain: string }) => {
    "use cache"
    cacheLife('weeks')
    cacheTag(String(domain))

    const payload = await getPayload({ config })
    const socials = (await payload.find({
        collection: 'socials',
        limit: 1,
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            }
        }
    }))?.docs?.at(0)
    return socials
}