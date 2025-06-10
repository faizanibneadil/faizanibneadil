import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import type { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from "payload";
import React from "react";

type TExcludeCollectionSlug = "users" | "media" | "pages" | "menu" | "socials" | "tenants" | "payload-jobs" | "payload-locked-documents" | "payload-preferences" | "payload-migrations"
type TCollections = Exclude<CollectionSlug, TExcludeCollectionSlug>
type TCollectionReactNode = React.FC<PaginatedDocs<DataFromCollectionSlug<TCollections>>>

const _collections: Record<TCollections, TCollectionReactNode> = {
    blogs: (props: PaginatedDocs<DataFromCollectionSlug<'blogs'>>) => {
        const { docs } = props || {}
        const blogs = docs.map(doc => {
            return (
                <div key={doc.id} className="flex flex-col gap-4">
                    <h3>{doc.title}</h3>
                    <p>Short Descriptin Of The Blog</p>
                </div>
            )
        })
        return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{blogs}</div>
    },
    notes: (props: PaginatedDocs<DataFromCollectionSlug<'notes'>>) => {
        const { docs } = props || {}
        const notes = docs.map(doc => {
            return (
                <div key={doc.id} className="flex flex-col gap-4">
                    <h3>{doc.title}</h3>
                    <p>Short Descriptin Of The Note</p>
                </div>
            )
        })
        return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{notes}</div>
    },
    projects: (props: PaginatedDocs<DataFromCollectionSlug<'projects'>>) => {
        const { docs } = props || {}
        const projects = docs.map(doc => {
            return (
                <div key={doc.id} className="flex flex-col gap-4">
                    <h3>{doc.title}</h3>
                    <p>Short Descriptin Of The Project</p>
                </div>
            )
        })
        return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
    }
}

export default async function Collection(props: { params: Promise<{ slug: TCollections, domain: string }> }) {
    const { params, } = props || {}
    const { slug, domain } = (await params)
    const collectionProps = await queryCollectionBySlug({ slug, domain })
    const Collection = _collections[slug]
    return slug && slug in _collections ? <Collection {...collectionProps} /> : null
}

const queryCollectionBySlug = React.cache(async ({ slug, domain }: { slug: TCollections, domain: string }) => {
    const payload = await getPayloadConfig()
    const result = await payload.find({ collection: slug, pagination: true, where: { 'tenant.slug': { equals: domain } } })
    return result || null
})