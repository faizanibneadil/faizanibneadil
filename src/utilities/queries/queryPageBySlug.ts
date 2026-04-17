import config from '@payload-config'
import { getPayload } from "payload"
import { isNumber } from "payload/shared"

export const queryPageBySlug = async ({
    domain,
    slug
}: {
    domain: string,
    slug: string
}) => {
    const payload = await getPayload({ config })
    const page = await payload.find({
        collection: 'pages',
        limit: 1,
        pagination: false,
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: domain
            },
            slug: {
                equals: slug
            },
        },
    })

    return page.docs?.at(0) || null
}