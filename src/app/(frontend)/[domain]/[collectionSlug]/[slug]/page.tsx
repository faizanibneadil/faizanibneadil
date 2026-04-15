import type { PageProps } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import type { CollectionSlug } from "payload"
import type { Metadata } from "next"
import { cache } from "react"
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain"
import { themesRegistry } from "@/themes"
import { queryPageBySlug } from "@/utilities/QueryPageBySlug"
import RenderCollection from '@/app/(frontend)/[domain]/[collectionSlug]/page'
import { isNumber } from "payload/shared"



export async function generateMetadata(props: PageProps): Promise<Metadata> {
    // const params = await props.params

    // const excludedCollectionSlug = params.slug?.split('-').at(0) as CollectionSlug
    // const domain = params.domain
    // const docSlug = params.id
    // const doc = await queryEntityById(excludedCollectionSlug, domain!, docSlug!)
    // const themeId = await queryThemeByDomain(domain!)

    // if (Object.hasOwn(themesRegistry, themeId)) {
    //     const docMap = themesRegistry[themeId]?.config?.documentConfig?.docMap

    //     if (Object.hasOwn(docMap, excludedCollectionSlug)) {
    //         const metadata = docMap[excludedCollectionSlug]?.metadata
    //         if (typeof metadata === 'function') {
    //             // @ts-expect-error
    //             return await metadata({ doc })
    //         }

    //         return metadata ?? {}
    //     }
    // }

    return {}
}

export default async function Page(props: PageProps) {
    const [params, searchParams] = await Promise.all([props.params, props.searchParams])
    const page = await queryPageBySlug({
        domain: params.domain,
        slug: params.slug
    })


    if (!page && !params.domain && !params.collectionSlug && !params.slug) {
        return '404 - Page not found'
    }

    if (page?.enableCollection) {
        return <RenderCollection params={Promise.resolve({ ...params })} searchParams={Promise.resolve({ ...searchParams })} />
    }
    
    const doc = await queryEntityById({
        docSlug: params.slug,
        domain: params.domain,
        collectionSlug: params.collectionSlug
    })

    const themeId = await queryThemeByDomain({
        domain: params.domain
    })


    if (Object.hasOwn(themesRegistry, themeId)) {
        if (params.collectionSlug === 'pages') {
            const blocksMap = themesRegistry[themeId]?.config?.blocksConfig.blocksMap
            const RenderBlocks = themesRegistry[themeId]?.config?.RenderBlocks
            return <RenderBlocks blocks={page?.layout} blocksMap={blocksMap} params={params} searchParams={searchParams} />
        } else {
            const docMap = themesRegistry[themeId]?.config?.documentConfig?.docMap
            const RenderDocumentView = themesRegistry[themeId]?.config?.documentConfig?.RenderDocumentView

            return <RenderDocumentView collectionSlug={params.collectionSlug} doc={doc} docMap={docMap} params={params} searchParams={searchParams} />
        }
    }

    return null
}

const queryEntityById = async ({ docSlug, domain, collectionSlug }: { collectionSlug: CollectionSlug, domain: string, docSlug: string }) => {
    const payload = await getPayloadConfig()
    const entity = await payload.find({
        collection: collectionSlug,
        limit: 1,
        pagination: false,
        where: {
            and: [
                {
                    [`tenant.${isNumber(domain) ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    [isNumber(docSlug) ? 'id' : 'slug']: {
                        equals: docSlug
                    }
                },
            ],
        },
    })
    return entity?.docs?.at(0) || null
}