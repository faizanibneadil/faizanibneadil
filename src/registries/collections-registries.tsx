import { Skeleton } from "@/components/ui/skeleton"
import type { PageProps } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import type { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from "payload"

export type TCollectionRegistries = {
    [K in CollectionSlug]?: {
        component: React.ComponentType<{
            collection: PaginatedDocs<DataFromCollectionSlug<K>>,
            isRootPage: boolean
        } & PageProps>,
        skeleton: React.ComponentType<{}>,
        metadata: (args: { doc: DataFromCollectionSlug<K> }) => Metadata | Promise<Metadata>
    }
}

export const CollectionsRegistries: TCollectionRegistries = {
    blogs: {
        component: dynamic(() => import("@/collections/Blogs/components/collection").then(({ Blogs }) => ({
            default: Blogs
        })), { ssr: true }),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title || 'Unknown Document.',
            description: doc?.meta?.description || 'No Description Provided.',
            ...(doc?.meta?.image && {
                icons: [{ url: getMediaUrl(doc?.meta?.image), fetchPriority: 'high' }]
            }),
        }),
        skeleton: () => {
            const projects = Array.from({ length: 10 }).map((item, idx) => (
                <div key={`project-${idx}`} className="flex flex-col gap-4">
                    <Skeleton className="w-full h-40 rounded-lg" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-40 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-40 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="w-20 h-10 rounded-lg" />
                        <Skeleton className="w-20 h-10 rounded-lg" />
                    </div>
                </div>
            ))
            return (
                <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
                </div>
            )
        }
    },
    projects: {
        component: dynamic(() => import("@/collections/Projects/components/collection").then(({ Projects }) => ({
            default: Projects
        })), { ssr: true }),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title || 'Unknown Document.',
            description: doc?.meta?.description || 'No Description Provided.',
            ...(doc?.meta?.image && {
                icons: [{ url: getMediaUrl(doc?.meta?.image), fetchPriority: 'high' }]
            }),
        }),
        skeleton: () => {
            const projects = Array.from({ length: 10 }).map((item, idx) => (
                <div key={`project-${idx}`} className="flex flex-col gap-4">
                    <Skeleton className="w-full h-40 rounded-lg" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-40 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-40 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="w-20 h-10 rounded-lg" />
                        <Skeleton className="w-20 h-10 rounded-lg" />
                    </div>
                </div>
            ))
            return (
                <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
                </div>
            )
        }
    },
    achievements: {
        component: dynamic(() => import("@/collections/Achievements/components/collection").then(({ Achievements }) => ({
            default: Achievements
        })), { ssr: true }),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title || 'Unknown Document.',
            description: doc?.meta?.description || 'No Description Provided.',
            ...(doc?.meta?.image && {
                icons: [{ url: getMediaUrl(doc?.meta?.image), fetchPriority: 'high' }]
            }),
        }),
        skeleton: () => <p>Display achievements skeleton</p>
    },
    certifications: {
        component: dynamic(() => import("@/collections/Certifications/components/collection").then(({ Certifications }) => ({
            default: Certifications
        })), { ssr: true }),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title || 'Unknown Document.',
            description: doc?.meta?.description || 'No Description Provided.',
            ...(doc?.meta?.image && {
                icons: [{ url: getMediaUrl(doc?.meta?.image), fetchPriority: 'high' }]
            }),
        }),
        skeleton: () => <p>Display certifications skeleton</p>
    },
    hackathons: {
        component: dynamic(() => import("@/collections/Hackathons/components/collection").then(({ Hackathons }) => ({
            default: Hackathons
        })), { ssr: true }),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title || 'Unknown Document.',
            description: doc?.meta?.description || 'No Description Provided.',
            ...(doc?.meta?.image && {
                icons: [{ url: getMediaUrl(doc?.meta?.image), fetchPriority: 'high' }]
            }),
        }),
        skeleton: () => <p>Display hackathon skeleton</p>
    },
    publications: {
        component: dynamic(() => import("@/collections/Publications/components/collection").then(({ Publications }) => ({
            default: Publications
        })), { ssr: true }),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title || 'Unknown Document.',
            description: doc?.meta?.description || 'No Description Provided.',
            ...(doc?.meta?.image && {
                icons: [{ url: getMediaUrl(doc?.meta?.image), fetchPriority: 'high' }]
            }),
        }),
        skeleton: () => <p>Display publications skeleton</p>
    },
    researches: {
        component: dynamic(() => import("@/collections/Researches/components/collection").then(({ Researches }) => ({
            default: Researches
        })), { ssr: true }),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title || 'Unknown Document.',
            description: doc?.meta?.description || 'No Description Provided.',
            ...(doc?.meta?.image && {
                icons: [{ url: getMediaUrl(doc?.meta?.image), fetchPriority: 'high' }]
            }),
        }),
        skeleton: () => <p>Display researches skeleton</p>
    },
}