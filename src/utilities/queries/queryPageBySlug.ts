import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
// import { draftMode } from 'next/headers'
import { getPayload } from "payload"
import { isNumber } from "payload/shared"

export const queryPageBySlug = async ({
    domain,
    slug
}: {
    domain: string,
    slug: string
}) => {
    "use cache"
    cacheLife('weeks')
    cacheTag(`${domain}_pages_${slug}`)


    // const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config })
    const page = await payload.find({
        collection: 'pages',
        limit: 1,
        // draft,
        // overrideAccess: draft,
        pagination: false,
        where: {
            and: [
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    slug: {
                        equals: slug,
                    },
                },
                {
                    _status: {
                        equals: 'published'
                    }
                }
            ],
        },
    })

    return page.docs?.at(0) || null
}