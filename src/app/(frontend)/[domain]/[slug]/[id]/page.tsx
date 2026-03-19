import type { PageProps } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import type { CollectionSlug } from "payload"
import type { Metadata } from "next"
import { cache } from "react"
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain"
import { themesRegistry } from "@/themes"



export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params

    const excludedCollectionSlug = params.slug?.split('-').at(0) as CollectionSlug
    const domain = params.domain
    const docSlug = params.id
    const doc = await queryEntityById(excludedCollectionSlug, domain!, docSlug!)
    const themeId = await queryThemeByDomain(domain!)

    if (Object.hasOwn(themesRegistry, themeId)) {
        const docMap = themesRegistry[themeId]?.config?.documentConfig?.docMap

        if (Object.hasOwn(docMap, excludedCollectionSlug)) {
            const metadata = docMap[excludedCollectionSlug]?.metadata
            if (typeof metadata === 'function') {
                // @ts-expect-error
                return await metadata({ doc })
            }

            return metadata ?? {}
        }
    }

    return {}
}

export default async function Page(props: PageProps) {
    const params = await props.params

    const excludedCollectionSlug = params.slug?.split('-').at(0) as CollectionSlug
    const domain = params.domain
    const docSlug = params.id
    const entity = await queryEntityById(excludedCollectionSlug, domain!, docSlug!)
    // console.log({ entityFromEntityPage: entity })
    const themeId = await queryThemeByDomain(domain!)

    if (Object.hasOwn(themesRegistry, themeId)) {
        const docMap = themesRegistry[themeId]?.config?.documentConfig?.docMap
        const DocumentRenderer = themesRegistry[themeId]?.config?.documentConfig?.DocumentRenderer

        return <DocumentRenderer pageProps={props} config={{
            docMap,
            docSlug,
            entity,
            excludedCollectionSlug
        }} />
    }

    return null
}

const queryEntityById = cache(async (slug: CollectionSlug, domain: string, docSlug: string) => {
    const isNumericDomain = !Number.isNaN(Number(domain))
    const isNumericDocSlug = !Number.isNaN(Number(docSlug))
    const payload = await getPayloadConfig()
    const entity = await payload.find({
        collection: slug,
        limit: 1,
        pagination: false,
        where: {
            and: [
                {
                    [`tenant.${isNumericDomain ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    [isNumericDocSlug ? 'id' : 'slug']: {
                        equals: docSlug
                    }
                },
            ],
        },
    })
    return entity?.docs?.at(0) || null
})