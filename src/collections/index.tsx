// import { sdk } from "@/lib/sdk"
import { cache } from "react"
import type { Page } from "@/payload-types"
import type { PagePropsWithParams } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import dynamic from "next/dynamic"
import type { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from "payload"

type TCollectionComponents = {
    [K in CollectionSlug]?: React.ComponentType<{
        collection: PaginatedDocs<DataFromCollectionSlug<K>>,
        params: Awaited<PagePropsWithParams['params']>,
        isRootPage: boolean
    }>
}

const _Collections: TCollectionComponents = {
    blogs: dynamic(() => import("@/collections/Blogs/components/collection").then(({ Blogs }) => ({
        default: Blogs
    })), { ssr: true }),
    notes: dynamic(() => import("@/collections/Notes/components/collection").then(({ Notes }) => ({
        default: Notes
    })), { ssr: true }),
    projects: dynamic(() => import("@/collections/Projects/components/collection").then(({ Projects }) => ({
        default: Projects
    })), { ssr: true }),
    achievements: dynamic(() => import("@/collections/Achievements/components/collection").then(({ Achievements }) => ({
        default: Achievements
    })), { ssr: true }),
    certifications: dynamic(() => import("@/collections/Certifications/components/collection").then(({ Certifications }) => ({
        default: Certifications
    })), { ssr: true }),
    educations: dynamic(() => import("@/collections/Educations/components/collection").then(({ Educations }) => ({
        default: Educations
    })), { ssr: true }),
    hackathons: dynamic(() => import("@/collections/Hackathons/components/collection").then(({ Hackathons }) => ({
        default: Hackathons
    })), { ssr: true }),
    licenses: dynamic(() => import("@/collections/Licenses/components/collection").then(({ Licenses }) => ({
        default: Licenses
    })), { ssr: true }),
    publications: dynamic(() => import("@/collections/Publications/components/collection").then(({ Publications }) => ({
        default: Publications
    })), { ssr: true }),
    researches: dynamic(() => import("@/collections/Researches/components/collection").then(({ Researches }) => ({
        default: Researches
    })), { ssr: true }),
    skills: dynamic(() => import("@/collections/Skills/components/collection").then(({ Skills }) => ({
        default: Skills
    })), { ssr: true })
}

export async function CollectionRenderer(props: { params: PagePropsWithParams['params'], configurations: Page['content']['configurations'] }) {
    const paramsFromProps = await props.params

    const slugFromConfig = props.configurations?.slug as CollectionSlug
    const domain = paramsFromProps.domain
    const collectionToRenderProps = await queryCollectionBySlug(slugFromConfig, domain!)
    const CollectionToRender = _Collections[slugFromConfig]
    if (slugFromConfig in _Collections && collectionToRenderProps) {
        // @ts-expect-error
        return <CollectionToRender collection={collectionToRenderProps} params={paramsFromProps} />
    }
    return null
}

const queryCollectionBySlug = cache(async (slug: CollectionSlug, domain: string) => {
    const payload = await getPayloadConfig()
    try {
        const result = await payload.find({
            collection: slug!,
            pagination: true,
            where: {
                'tenant.slug': {
                    in: [domain]
                }
            }
        })
        return result || null
    } catch (error) {
        console.error(`Something went wrong to fetch collection from ${slug} of ${domain}`, error)
        return null
    }
})