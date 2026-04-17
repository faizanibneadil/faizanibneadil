import { Skeleton } from "@/components/ui/skeleton"
import { CollectionMapType } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import dynamic from "next/dynamic"

export const __MagicCollectionsMap: CollectionMapType = {
    blogs: {
        enableDocumentView: true,
        component: dynamic(() => import("@/shelves/Magic/collections/blogs").then(({ Blogs }) => ({
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
        enableDocumentView: true,
        component: dynamic(() => import("@/shelves/Magic/collections/projects").then(({ Projects }) => ({
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
        enableDocumentView: true,
        component: dynamic(() => import("@/shelves/Magic/collections/achievements").then(({ Achievements }) => ({
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
        enableDocumentView: true,
        component: dynamic(() => import("@/shelves/Magic/collections/certifications").then(({ Certifications }) => ({
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
        enableDocumentView: true,
        component: dynamic(() => import("@/shelves/Magic/collections/hackathons").then(({ Hackathons }) => ({
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
        enableDocumentView: true,
        component: dynamic(() => import("@/shelves/Magic/collections/publications").then(({ Publications }) => ({
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
        enableDocumentView: true,
        component: dynamic(() => import("@/shelves/Magic/collections/researches").then(({ Researches }) => ({
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