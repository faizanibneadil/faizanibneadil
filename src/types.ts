import type { 
    CollectionAfterChangeHook, 
    CollectionAfterDeleteHook, 
    CollectionSlug, 
    TypeWithID 
} from "payload"

export type Config = { invalidateRootRoute?: boolean }
export type AppCollectionAfterChangeHook<T extends TypeWithID = any, A extends Config = any> = (config: A) => CollectionAfterChangeHook<T>
export type AppCollectionAfterDeleteHook<T extends TypeWithID = any, A extends Config = any> = (config: A) => CollectionAfterDeleteHook<T>
export type PagePropsWithParams = { params: Promise<{ id?: string, domain?: string, slug?: CollectionSlug }> }