import { CollectionAfterChangeHook, CollectionAfterDeleteHook, TypeWithID } from "payload"

export type Config = { invalidateRootRoute?: boolean }
export type AppCollectionAfterChangeHook<T extends TypeWithID = any> = (config: Config) => CollectionAfterChangeHook<T>
export type AppCollectionAfterDeleteHook<T extends TypeWithID = any> = (config: Config) => CollectionAfterDeleteHook<T>