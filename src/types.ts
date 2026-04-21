import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
    CollectionSlug,
    GeneratePreviewURL,
    TypeWithID,
    BlockSlug,
    PaginatedDocs,
    DataFromCollectionSlug
} from "payload"
import type { Page, Config as PayloadConfig } from "./payload-types"
import { Metadata } from "next"

export type Config = { invalidateRootRoute?: boolean }
export type AppCollectionAfterChangeHook<T extends TypeWithID = any, A extends Config = any> = (config: A) => CollectionAfterChangeHook<T>
export type AppCollectionAfterDeleteHook<T extends TypeWithID = any, A extends Config = any> = (config: A) => CollectionAfterDeleteHook<T>
export type AppGeneratePreview = (config: { collection: CollectionSlug }) => GeneratePreviewURL
export type PageProps = {
    params: Promise<{
        domain: string,
        slug: string,
        collectionSlug: CollectionSlug
    }>,
    searchParams: Promise<{
        vp: 'd' | 'm' | 't'
    } & {
        [key: string]: string | string[] | undefined
    }>
}
export type BaseParams = {
    params: PageProps['params'] | Awaited<PageProps['params']>,
    searchParams: PageProps['searchParams'] | Awaited<PageProps['searchParams']>
}

export type AwaitedBaseParams = {
    params: Awaited<PageProps['params']>,
    searchParams: Awaited<PageProps['searchParams']>
}

// Block types
export type LayoutProps = React.PropsWithChildren<Omit<PageProps, 'searchParams'>>
export type BlocksRegistryProps = {
    blocks: NonNullable<Page>['layout'][][0],
} & PageProps
export type BlockParams = AwaitedBaseParams
export type BlockProps<K extends BlockSlug> = {
    blockProps: Extract<NonNullable<NonNullable<Page>['layout']>[number], { blockType: K }>
} & BlockParams

// collection types
export type CollectionsRegistryProps = {
    page: Page | null
} & PageProps
export type CollectionParams = AwaitedBaseParams
export type CollectionProps<K extends CollectionSlug> = {
    collection: PaginatedDocs<DataFromCollectionSlug<K>>
} & CollectionParams


// Doc types
export type DocRegistryProps = {
    page: Page
} & PageProps
export type DocParams = BaseParams
export type DocProps<K extends CollectionSlug> = {
    entity: DataFromCollectionSlug<K>
} & CollectionParams


// Themes Types

export type ThemeMeta = {
    name: string,
    slug: string,
    description: string
}

export type BlocksMapType = {
    [K in BlockSlug]?: {
        skeleton: React.ComponentType<{}>,
        component: React.ComponentType<{
            blockProps: Extract<NonNullable<NonNullable<Page>['layout']>[number], { blockType: K }>,
        } & AwaitedBaseParams>
    }
}

export type CollectionMapType = {
    [K in CollectionSlug]?: {
        component: React.ComponentType<{
            collection: PaginatedDocs<DataFromCollectionSlug<K>>,
            isRootPage: boolean
        } & AwaitedBaseParams>,
        skeleton: React.ComponentType<{}>,
        metadata: (args: { doc: Page }) => Metadata | Promise<Metadata>,
        enableDocumentView: boolean
    }
}

export type DocMapType = {
    [K in CollectionSlug]?: {
        component: React.ComponentType<{ entity: DataFromCollectionSlug<K> } & AwaitedBaseParams>,
        metadata: (args: { doc: DataFromCollectionSlug<K> }) => Metadata | Promise<Metadata>
    }
}

export type RenderPageProps = AwaitedBaseParams & {
    themeId: number,
    enableCollection: boolean,
    page: Page | null,
    blocksMap: BlocksMapType,
    collectionMap: CollectionMapType
}

export type RenderDocumentViewProps = AwaitedBaseParams & {
    doc: DataFromCollectionSlug<CollectionSlug> | null,
    docMap: DocMapType,
    collectionSlug: CollectionSlug
}

export type LayoutRendererProps = React.PropsWithChildren & {
    themeId: number,
    params: { domain: string }
}

export type ShelfConfig = {
    themeMeta: ThemeMeta,
    config: {
        skeleton: React.ComponentType<{
            docMap: DocMapType,
            blocksMap: BlocksMapType,
            collectionsMap: CollectionMapType,
        }>,
        blocksConfig: {
            blocksMap: BlocksMapType,
        },
        collectionConfig: {
            collectionsMap: CollectionMapType,
            RenderCollection: React.ComponentType<AwaitedBaseParams & {
                collection: PaginatedDocs<DataFromCollectionSlug<CollectionSlug>>,
                collectionsMap: CollectionMapType,
            }>
        },
        documentConfig: {
            docMap: DocMapType,
            RenderDocumentView: React.ComponentType<RenderDocumentViewProps>,
        },
        layout: React.ComponentType<LayoutRendererProps>,
        RenderBlocks: React.ComponentType<AwaitedBaseParams & {
            blocks: PayloadConfig['blocks'][keyof PayloadConfig['blocks']][] | null | undefined,
            blocksMap: BlocksMapType
        }>
    }
}
