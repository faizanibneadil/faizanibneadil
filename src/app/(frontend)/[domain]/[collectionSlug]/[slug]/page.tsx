import { Suspense } from "react"
import RenderCollectionPage from '@/app/(frontend)/[domain]/[collectionSlug]/page'
import { PayloadRedirects } from "@/components/PayloadRedirects"
import type { PageProps } from "@/types"
import { getShelfConfig } from '@/utilities/getShelfConfig'
import { hasShelf } from '@/utilities/hasShelf'
import { queryPortfolioSettings } from '@/utilities/queries/queryPortfolioSettings'
// import { LexicalEditorViewMap } from '@payloadcms/richtext-lexical'
import type { Metadata } from "next"
import { CollectionSlug } from 'payload'


export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const [params, searchParams] = await Promise.all([props.params, props.searchParams])

    const settings = await queryPortfolioSettings({
        domain: params.domain
    })

    const {
        shelfID,
        docMap,
        queryCollectionViewBySlug,
        queryPageBySlug
    } = getShelfConfig({
        shelf: settings?.shelf,
        params: params,
        searchParams: searchParams
    })

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

    if (hasShelf(shelfID!)) {
        if (!page && Object.hasOwn(docMap, params.collectionSlug)) {
            const doc = await queryCollectionViewBySlug()
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

    const url = `/${params.domain}/${params.collectionSlug}/${params.slug}`

    const settings = await queryPortfolioSettings({
        domain: params.domain
    })

    const {
        RenderBlocks,
        RenderDocumentView,
        RenderHero,
        blocksMap,
        docMap,
        shelfID,
        queryCollectionViewBySlug,
        queryPageBySlug
    } = getShelfConfig({
        shelf: settings?.shelf,
        params: params,
        searchParams: searchParams
    })


    if (!hasShelf(shelfID!)) {
        return 'Shelf not found'
    }

    const page = await queryPageBySlug()

    if (Boolean(page) === false) {
        const doc = await queryCollectionViewBySlug()
        return (
            <Suspense fallback={null}>
                <PayloadRedirects domain={params?.domain} url={url} />
                <RenderHero heroProps={page?.hero} params={params} searchParams={searchParams} />
                <RenderDocumentView collectionSlug={params?.collectionSlug} doc={doc} docMap={docMap} params={params} searchParams={searchParams} />
            </Suspense>
        )
    }

    if (page?.enableCollection) {
        return (
            <Suspense fallback={null}>
                <PayloadRedirects domain={params.domain} url={url} />
                <RenderCollectionPage params={Promise.resolve({ ...params, collectionSlug: page?.configuredCollectionSlug as CollectionSlug })} searchParams={Promise.resolve({ ...searchParams })} />
            </Suspense>
        )
    }

    return (
        <>
            <RenderHero heroProps={page?.hero} params={params} searchParams={searchParams} />
            <RenderBlocks blocks={page?.layout} blocksMap={blocksMap} params={params} searchParams={searchParams} />
        </>
    )


}