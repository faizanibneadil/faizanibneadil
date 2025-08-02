import { Page } from "@/payload-types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import { CollectionConfig, CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from "payload"
import React from "react"

type TConfigurations = "notes" | "blogs" | "educations" | "projects" | "skills" | "hackathons" | "researches" | "achievements" | "certifications" | "publications" | "licenses"
// type TCollections = Exclude<TConfigurations['slug'], null | undefined>
type TCollectionReactNode = React.FC<PaginatedDocs<DataFromCollectionSlug<TConfigurations>>>

const _Collections: Record<TConfigurations, TCollectionReactNode> = {
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
    },
    achievements: () => null,
    certifications: () => null,
    educations: () => null,
    hackathons: () => null,
    licenses: () => null,
    publications: () => null,
    researches: () => null,
    skills: () => null
}

export async function CollectionRenderer(props: { params: Promise<{ slug: TConfigurations, domain: string }> }) {
    const { params, } = props || {}
    const { slug, domain } = (await params)
    const collectionProps = await queryCollectionBySlug({ slug, domain })
    const Collection = _Collections[slug]
    return slug && slug in _Collections ? <Collection {...collectionProps} /> : null
}

const queryCollectionBySlug = React.cache(async ({ slug, domain }: { slug: TConfigurations, domain: string }) => {
    const payload = await getPayloadConfig()
    const result = await payload.find({ collection: slug, pagination: true, where: { 'tenant.slug': { equals: domain } } })
    return result || null
})