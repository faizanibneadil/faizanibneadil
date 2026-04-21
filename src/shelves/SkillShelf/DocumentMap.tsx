import { DocMapType } from '@/types'
import { getMediaUrl } from '@/utilities/getURL'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import dynamic from 'next/dynamic'

export const __SkillshelfDocMap: DocMapType = {
    blogs: {
        component: dynamic(() => import('@/shelves/SkillShelf/documents/blogs').then(({ BlogEntity }) => {
            return BlogEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || doc?.title,
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image) }]
            }
        })
    },
    projects: {
        component: dynamic(() => import('@/shelves/SkillShelf/documents/projects').then(({ ProjectEntity }) => {
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
        component: dynamic(() => import('@/shelves/SkillShelf/documents/achievements').then(({ AchievementEntity }) => {
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
        component: dynamic(() => import('@/shelves/SkillShelf/documents/certifications').then(({ CertificationEntity }) => {
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
        component: dynamic(() => import('@/shelves/SkillShelf/documents/hackathons').then(({ HackathonEntity }) => {
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
        component: dynamic(() => import('@/shelves/SkillShelf/documents/publications').then(({ PublicationEntity }) => {
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
        component: dynamic(() => import('@/shelves/SkillShelf/documents/researches').then(({ ResearchEntity }) => {
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