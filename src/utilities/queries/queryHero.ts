import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { CollectionSlug } from 'payload'
import { isNumber } from 'payload/shared'
export const queryHero = async ({
    collectionSlug,
    domain
}: {
    domain: string,
    collectionSlug: CollectionSlug
}) => {
    "use cache"
    cacheLife('weeks')
    cacheTag(`${domain}_${collectionSlug}`)

    const payload = await getPayload({ config })

    const hero = await payload.find({
        collection: 'pages',
        select: {
            hero: true
        },
        where: {
            and: [
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    _status: {
                        equals: 'published'
                    }
                },
                {
                    configuredCollectionSlug: {
                        equals: collectionSlug
                    }
                }
            ]
        }
    })

    return hero?.docs?.at(0)?.hero
}