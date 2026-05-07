import type { Config } from "@/payload-types"
import { ShelvesMaps } from "@/shelves"
import type { PageProps } from "@/types"
import { queryCollectionViewBySlug } from "./queries/queryCollectionViewBySlug"
import { queryPageBySlug } from "./queries/queryPageBySlug"
import { queryHero } from "./queries/queryHero"
import { queryCollectionBySlug } from "./queries/queryCollectionBySlug"
import { deepMerge } from "payload"
import { queryPageByConfiguredCollection } from "./queries/queryPageByConfiguiredCollection"

export function getShelfConfig({
    shelf,
    params,
    searchParams
}: {
    shelf: Config['collections']['portfolio-settings']['shelf'],
    params?: Awaited<PageProps['params']>,
    searchParams?: Awaited<PageProps['searchParams']>
}) {
    const shelfID = typeof shelf === 'object' ? shelf?.id : shelf
    const shelfConfig = ShelvesMaps[shelfID!]

    const docMap = shelfConfig?.config?.documentConfig?.docMap
    const blocksMap = shelfConfig?.config?.blocksConfig.blocksMap
    const RenderBlocks = shelfConfig?.config?.RenderBlocks
    const RenderDocumentView = shelfConfig?.config?.documentConfig?.RenderDocumentView
    const RenderHero = shelfConfig?.config?.RenderHero
    const RenderCollection = shelfConfig?.config?.collectionConfig?.RenderCollection
    const collectionsMap = shelfConfig?.config?.collectionConfig?.collectionsMap
    const ShelfLayout = shelfConfig?.config?.layout

    function _queryCollectionViewBySlug(overrides?: Partial<typeof params>) {
        const _params = deepMerge({
            collectionSlug: params?.collectionSlug!,
            domain: params?.domain!,
            slug: params?.slug!
        }, overrides || {})

        return queryCollectionViewBySlug(_params)
    }

    function _queryPageBySlug(overrides?: Partial<typeof params>) {
        const _params = deepMerge({
            domain: params?.domain!,
            slug: params?.slug!
        }, overrides || {})

        return queryPageBySlug(_params)
    }

    function _queryCollectionBySlug(overrides?: Partial<typeof params>) {
        const _params = deepMerge({
            collectionSlug: params?.collectionSlug!,
            domain: params?.domain!
        }, overrides || {})

        return queryCollectionBySlug(_params)
    }

    function _queryHero(overrides?: Partial<typeof params>) {
        const _params = deepMerge({
            collectionSlug: params?.collectionSlug!,
            domain: params?.domain!
        }, overrides || {})

        return queryHero(_params)
    }

    function _queryPageByConfiguredCollection(overrides?: Partial<typeof params>) {
        const _params = deepMerge({
            collectionSlug: params?.collectionSlug!,
            domain: params?.domain!
        }, overrides || {})

        return queryPageByConfiguredCollection(_params)
    }

    return {
        shelfID,
        docMap,
        blocksMap,
        RenderBlocks,
        RenderCollection,
        RenderDocumentView,
        RenderHero,
        collectionsMap,
        ShelfLayout,
        queryCollectionViewBySlug: _queryCollectionViewBySlug,
        queryPageBySlug: _queryPageBySlug,
        queryHero: _queryHero,
        queryCollectionBySlug: _queryCollectionBySlug,
        queryPageByConfiguredCollection: _queryPageByConfiguredCollection
    }
}