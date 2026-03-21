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
import type { Page } from "./payload-types"
import { Metadata } from "next"

export type Config = { invalidateRootRoute?: boolean }
export type AppCollectionAfterChangeHook<T extends TypeWithID = any, A extends Config = any> = (config: A) => CollectionAfterChangeHook<T>
export type AppCollectionAfterDeleteHook<T extends TypeWithID = any, A extends Config = any> = (config: A) => CollectionAfterDeleteHook<T>
export type AppGeneratePreview = (config: { collection: CollectionSlug }) => GeneratePreviewURL
export type PageProps = {
    params: Promise<{
        domain: string,
        id: string,
        slug: CollectionSlug
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

// Block types
export type LayoutProps = React.PropsWithChildren<Omit<PageProps, 'searchParams'>>
export type BlocksRegistryProps = {
    blocks: NonNullable<Page['content']>['layout'][][0],
} & PageProps
export type BlockParams = BaseParams
export type BlockProps<K extends BlockSlug> = {
    blockProps: Extract<NonNullable<NonNullable<Page['content']>['layout']>[number], { blockType: K }>
} & BlockParams

// collection types
export type CollectionsRegistryProps = {
    page: Page | null
} & PageProps
export type CollectionParams = BaseParams
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
            blockProps: Extract<NonNullable<NonNullable<Page['content']>['layout']>[number], { blockType: K }>,
        } & PageProps>
    }
}

export type CollectionMapType = {
    [K in CollectionSlug]?: {
        component: React.ComponentType<{
            collection: PaginatedDocs<DataFromCollectionSlug<K>>,
            isRootPage: boolean
        } & PageProps>,
        skeleton: React.ComponentType<{}>,
        metadata: (args: { doc: DataFromCollectionSlug<K> }) => Metadata | Promise<Metadata>,
        enableDocumentView: boolean
    }
}

export type DocMapType = {
    [K in CollectionSlug]?: {
        component: React.ComponentType<{ entity: DataFromCollectionSlug<K> } & PageProps>,
        metadata: (args: { doc: DataFromCollectionSlug<K> }) => Metadata | Promise<Metadata>
    }
}

export type PageRendererProps = PageProps & {
    themeId: number,
    enableCollection: boolean,
    page: Page | null,
    blocksMap: BlocksMapType,
    collectionMap: CollectionMapType
}

export type DocumentRendererProps = PageProps & {
    entity: DataFromCollectionSlug<CollectionSlug> | null,
    docMap: DocMapType,
    docSlug: string,
    excludedCollectionSlug: CollectionSlug
}

export type LayoutRendererProps = React.PropsWithChildren & {
    themeId: number,
    params: Promise<{ domain: string }>
}

export type ThemeConfig = {
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
        },
        documentConfig: {
            docMap: DocMapType,
            DocumentRenderer: React.ComponentType<DocumentRendererProps>,
        },
        PageRenderer: React.ComponentType<PageRendererProps>,
        layout: React.ComponentType<LayoutRendererProps>
    }
}