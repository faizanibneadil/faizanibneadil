import config from '@payload-config'
import { getPayload } from "payload"
import { isNumber } from "payload/shared"

export const queryShelfByDomain = async ({ domain }: { domain: string }) => {
    const payload = await getPayload({ config })
    const shelfConfig = await payload.find({
        collection: 'portfolio-settings',
        select: {
            shelf: true
        },
        where: {
            [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                equals: Number(domain),
            },
        },
        depth: 0,
    })

    const theme = shelfConfig?.docs?.at(0)
    const themeID = typeof theme === 'object' ? theme.id : theme

    return themeID ?? 1
}