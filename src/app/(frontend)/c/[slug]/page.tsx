import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import type { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from "payload";
import React from "react";

type TExcludeCollectionSlug = "users" | "media" | "pages" | "payload-jobs" | "payload-locked-documents" | "payload-preferences" | "payload-migrations"
type TCollections = Exclude<CollectionSlug, TExcludeCollectionSlug>
type TCollectionComponent = (props: PaginatedDocs<DataFromCollectionSlug<TCollections>>) => React.ReactNode
const _collections: Record<TCollections, TCollectionComponent> = {
    blogs: (props: PaginatedDocs<DataFromCollectionSlug<'blogs'>>) => {
        const { docs } = props || {}
        return <div>{docs.map(doc => <div key={doc.id}>{doc.title}</div>)}</div>
    },
    notes: (props: PaginatedDocs<DataFromCollectionSlug<'notes'>>) => {
        const { docs } = props || {}
        return <div>{docs.map(doc => <div key={doc.id}>{doc.title}</div>)}</div>
    },
    projects: (props: PaginatedDocs<DataFromCollectionSlug<'projects'>>) => {
        const { docs } = props || {}
        return <div>{docs.map(doc => <div key={doc.id}>{doc.title}</div>)}</div>
    }
}

export default async function Collection(props: { params: Promise<{ slug: TCollections }> }) {
    const { params } = props || {}
    const slug = (await params).slug
    const collectionProps = await queryCollectionBySlug({ slug })
    const Collection = _collections[slug]
    return slug && slug in _collections ? <Collection {...collectionProps} /> : null
}

const queryCollectionBySlug = React.cache(async ({ slug }: { slug: TCollections }) => {
    const payload = await getPayloadConfig()
    const result = await payload.find({ collection: slug, pagination: true })
    return result || null
})