import RenderCollection from '@/app/(frontend)/[domain]/[collectionSlug]/page'
import { PayloadRedirects } from "@/components/PayloadRedirects"
import { ShelvesMaps } from "@/shelves"
import type { PageProps } from "@/types"
import { queryCollectionViewBySlug } from '@/utilities/queries/queryCollectionViewBySlug'
import { queryPageBySlug } from '@/utilities/queries/queryPageBySlug'
import { queryPortfolioSettings } from '@/utilities/queries/queryPortfolioSettings'
import { LexicalEditorViewMap } from '@payloadcms/richtext-lexical'
import type { Metadata } from "next"
import { CollectionSlug } from 'payload'
import { Suspense } from "react"


export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const [params, searchParams] = await Promise.all([props.params, props.searchParams])

    let page = await queryPageBySlug({
        slug: params.slug,
        domain: params.domain
    })

    if (!page && !params.slug && !params.collectionSlug && !params.domain) {
        return {
            title: 'Not Found'
        }
    }

    if (page?.enableCollection && page?.configuredCollectionSlug) {
        page = await queryPageBySlug({
            slug: page?.configuredCollectionSlug as CollectionSlug,
            domain: params.domain
        })
    }

    const settings = await queryPortfolioSettings({
        domain: params.domain
    })

    const shelfID = typeof settings?.shelf === 'object' ? settings?.shelf?.id : settings?.shelf

    if (Object.hasOwn(ShelvesMaps, shelfID!)) {
        const docMap = ShelvesMaps[shelfID!].config.documentConfig.docMap
        if (!page && Object.hasOwn(docMap, params.collectionSlug)) {
            const doc = await queryCollectionViewBySlug({
                collectionSlug: params.collectionSlug,
                domain: params.domain,
                slug: params.slug
            })
            const metadata = docMap?.[params?.collectionSlug]?.metadata

            if (typeof metadata === 'function') {
                // @ts-expect-error
                return await metadata({ doc })
            }
            return metadata ?? {}
        }
    }

    // Fallback Page Metadata
    return {
        title: page?.meta?.title || page?.title,
        description: page?.meta?.description || page?.title,
    }
}

export default async function Page(props: PageProps) {
    const [params, searchParams] = await Promise.all([props.params, props.searchParams])

    const page = await queryPageBySlug({
        domain: params.domain,
        slug: params.slug
    })

    if (page?.enableCollection) {
        return (
            <Suspense fallback={null}>
                <PayloadRedirects domain={params.domain} url={`/${params.collectionSlug}/${params.slug}`} />
                <RenderCollection params={Promise.resolve({ ...params, collectionSlug: page?.configuredCollectionSlug as CollectionSlug })} searchParams={Promise.resolve({ ...searchParams })} />
            </Suspense>
        )
    }

    const settings = await queryPortfolioSettings({
        domain: params.domain
    })

    const shelfID = typeof settings?.shelf === 'object' ? settings?.shelf?.id : settings?.shelf

    if (!Object.hasOwn(ShelvesMaps, shelfID!)) {
        return 'Theme not found'
    }

    const shelfConfig = ShelvesMaps?.[shelfID!]
    const blocksMap = shelfConfig?.config?.blocksConfig.blocksMap
    const RenderBlocks = shelfConfig?.config?.RenderBlocks
    const docMap = shelfConfig?.config?.documentConfig?.docMap
    const RenderDocumentView = shelfConfig?.config?.documentConfig?.RenderDocumentView
    const RenderHero = shelfConfig?.config?.RenderHero


    if (Boolean(page?.layout?.length)) {
        return (
            <>
                <RenderHero heroProps={page?.hero} params={params} searchParams={searchParams} />
                <RenderBlocks blocks={page?.layout} blocksMap={blocksMap} params={params} searchParams={searchParams} />
            </>
        )
    }

    const doc = await queryCollectionViewBySlug({
        collectionSlug: params.collectionSlug,
        domain: params.domain,
        slug: params.slug
    })

    return (
        <Suspense fallback='Redirecting ...'>
            <PayloadRedirects domain={params?.domain} url={`/${params?.domain}/${params?.collectionSlug}/${params?.slug}`} />
            <RenderHero heroProps={page?.hero} params={params} searchParams={searchParams} />
            <RenderDocumentView collectionSlug={params?.collectionSlug} doc={doc} docMap={docMap} params={params} searchParams={searchParams} />
        </Suspense>
    )
}