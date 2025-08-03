import { Page } from "@/payload-types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import dynamic from "next/dynamic"
import { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from "payload"
import React from "react"

type TCollectionComponents = {
    [K in CollectionSlug]?: React.ComponentType<PaginatedDocs<DataFromCollectionSlug<K>>>
}

const _Collections: TCollectionComponents = {
    blogs: dynamic(() => import("@/collections/Blogs/components/collection").then(({ Blogs }) => {
        return Blogs
    }), { ssr: true }),
    notes: dynamic(() => import("@/collections/Notes/components/collection").then(({ Notes }) => {
        return Notes
    }), { ssr: true }),
    projects: dynamic(() => import("@/collections/Projects/components/collection").then(({ Projects }) => {
        return Projects
    }), { ssr: true }),
    achievements: dynamic(() => import("@/collections/Achievements/components/collection").then(({ Achievements }) => {
        return Achievements
    }), { ssr: true }),
    certifications: dynamic(() => import("@/collections/Certifications/components/collection").then(({ Certifications }) => {
        return Certifications
    }), { ssr: true }),
    educations: dynamic(() => import("@/collections/Educations/components/collection").then(({ Educations }) => {
        return Educations
    }), { ssr: true }),
    hackathons: dynamic(() => import("@/collections/Hackathons/components/collection").then(({ Hackathons }) => {
        return Hackathons
    }), { ssr: true }),
    licenses: dynamic(() => import("@/collections/Licenses/components/collection").then(({ Licenses }) => {
        return Licenses
    }), { ssr: true }),
    publications: dynamic(() => import("@/collections/Publications/components/collection").then(({ Publications }) => {
        return Publications
    }), { ssr: true }),
    researches: dynamic(() => import("@/collections/Researches/components/collection").then(({ Researches }) => {
        return Researches
    }), { ssr: true }),
    skills: dynamic(() => import("@/collections/Skills/components/collection").then(({ Skills }) => {
        return Skills
    }), { ssr: true })
}

export async function CollectionRenderer(props: { params: Promise<{ slug: CollectionSlug, domain: string }>, configurations: Page['configurations'] }) {
    const { params, configurations } = props || {}
    const { slug, domain } = (await params)
    
    const collectionToRenderProps = await queryCollectionBySlug({ 
        slug: configurations && configurations?.slug === slug ? slug : configurations?.slug as CollectionSlug, 
        domain 
    })
    const CollectionToRender = _Collections[slug]
    // @ts-expect-error
    return slug && slug in _Collections ? <CollectionToRender {...collectionToRenderProps} /> : null
}

const queryCollectionBySlug = React.cache(async ({ slug, domain }: { slug: CollectionSlug, domain: string }) => {
    const payload = await getPayloadConfig()
    const result = await payload.find({
        collection: slug,
        pagination: true,
        where: { 'tenant.slug': { equals: domain } }
    })
    return result || null
})