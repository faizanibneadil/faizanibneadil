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
    blocks: Page['content']['layout'][][0],
} & PageProps
export type BlockParams = BaseParams
export type BlockProps<K extends BlockSlug> = {
    blockProps: Extract<NonNullable<Page['content']['layout']>[number], { blockType: K }>
} & BlockParams

// collection types
export type CollectionsRegistryProps = {
    page: Page
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