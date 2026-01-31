import dynamic from "next/dynamic"
import type { CollectionSlug, DataFromCollectionSlug } from "payload"
import { getMediaUrl, getServerSideURL } from "@/utilities/getURL"
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext"
import type { Metadata } from "next"
import type { PageProps } from "@/types"

export const og = (image: Parameters<typeof getMediaUrl>[0]) => getMediaUrl(image)
export const fallbackOg = () => `${getServerSideURL()}/graphics/favicon.svg`

export type TDocComponents = {
    [K in CollectionSlug]?: {
        component: React.ComponentType<{ entity: DataFromCollectionSlug<K> } & PageProps>,
        metadata: (args: { doc: DataFromCollectionSlug<K> }) => Metadata | Promise<Metadata>
    }
}

export const DocRegistries: TDocComponents = {
    blogs: {
        component: dynamic(() => import('@/collections/Blogs/components/entity').then(({ BlogEntity }) => {
            return BlogEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.content! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image || doc?.content?.featured_image) || fallbackOg() }]
            }
        })
    },
    projects: {
        component: dynamic(() => import('@/collections/Projects/components/entity').then(({ ProjectEntity }) => {
            return ProjectEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.overview! }),
            openGraph: {
                type: 'website',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image ?? doc?.content?.thumbnail) ?? fallbackOg() }]
            }
        })
    },
    achievements: {
        component: dynamic(() => import('@/collections/Achievements/components/entity').then(({ AchievementEntity }) => {
            return AchievementEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image || doc?.content?.image) || fallbackOg() }]
            }
        })
    },
    certifications: {
        component: dynamic(() => import('@/collections/Certifications/components/entity').then(({ CertificationEntity }) => {
            return CertificationEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image || doc?.content?.image) || fallbackOg() }]
            }
        })
    },
    hackathons: {
        component: dynamic(() => import('@/collections/Hackathons/components/entity').then(({ HackathonEntity }) => {
            return HackathonEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image ?? doc?.content?.image) || fallbackOg() }]
            }
        })
    },
    publications: {
        component: dynamic(() => import('@/collections/Publications/components/entity').then(({ PublicationEntity }) => {
            return PublicationEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image ?? doc?.content?.image) || fallbackOg() }]
            }
        })
    },
    researches: {
        component: dynamic(() => import('@/collections/Researches/components/entity').then(({ ResearchEntity }) => {
            return ResearchEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image ?? doc?.content?.image) || fallbackOg() }]
            }
        })
    },
}