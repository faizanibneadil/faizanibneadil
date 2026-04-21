import { DocMapType } from '@/types'
import { getMediaUrl } from '@/utilities/getURL'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import dynamic from 'next/dynamic'

export const __MagicDocMap: DocMapType = {
    blogs: {
        component: dynamic(() => import('@/shelves/Magic/documents/blogs').then(({ BlogEntity }) => {
            return BlogEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image || doc?.featured_image) }]
            }
        })
    },
    projects: {
        component: dynamic(() => import('@/shelves/Magic/documents/projects').then(({ ProjectEntity }) => {
            return ProjectEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.overview! }),
            openGraph: {
                type: 'website',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.thumbnail) }]
            }
        })
    },
    achievements: {
        component: dynamic(() => import('@/shelves/Magic/documents/achievements').then(({ AchievementEntity }) => {
            return AchievementEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image || doc?.image) }]
            }
        })
    },
    certifications: {
        component: dynamic(() => import('@/shelves/Magic/documents/certifications').then(({ CertificationEntity }) => {
            return CertificationEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image || doc?.image) }]
            }
        })
    },
    hackathons: {
        component: dynamic(() => import('@/shelves/Magic/documents/hackathons').then(({ HackathonEntity }) => {
            return HackathonEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.image) }]
            }
        })
    },
    publications: {
        component: dynamic(() => import('@/shelves/Magic/documents/publications').then(({ PublicationEntity }) => {
            return PublicationEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.image) }]
            }
        })
    },
    researches: {
        component: dynamic(() => import('@/shelves/Magic/documents/researches').then(({ ResearchEntity }) => {
            return ResearchEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.image) }]
            }
        })
    },
}