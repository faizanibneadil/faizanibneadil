import type { PageProps } from "@/types"
import dynamic from "next/dynamic"
import type { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from "payload"

export type TCollectionRegistries = {
    [K in CollectionSlug]?: React.ComponentType<{
        collection: PaginatedDocs<DataFromCollectionSlug<K>>,
        isRootPage: boolean
    } & PageProps>
}

export const CollectionsRegistries: TCollectionRegistries = {
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