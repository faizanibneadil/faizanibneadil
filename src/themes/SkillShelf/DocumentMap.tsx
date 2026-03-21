import { DocMapType } from '@/types'
import { getMediaUrl } from '@/utilities/getURL'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import dynamic from 'next/dynamic'

export const __SkillshelfDocMap: DocMapType = {
    blogs: {
        component: dynamic(() => import('@/themes/SkillShelf/documents/blogs').then(({ BlogEntity }) => {
            return BlogEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.content! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image || doc?.content?.featured_image) }]
            }
        })
    },
    projects: {
        component: dynamic(() => import('@/themes/SkillShelf/documents/projects').then(({ ProjectEntity }) => {
            return ProjectEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.overview! }),
            openGraph: {
                type: 'website',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.content?.thumbnail) }]
            }
        })
    },
    achievements: {
        component: dynamic(() => import('@/themes/SkillShelf/documents/achievements').then(({ AchievementEntity }) => {
            return AchievementEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image || doc?.content?.image) }]
            }
        })
    },
    certifications: {
        component: dynamic(() => import('@/themes/SkillShelf/documents/certifications').then(({ CertificationEntity }) => {
            return CertificationEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image || doc?.content?.image) }]
            }
        })
    },
    hackathons: {
        component: dynamic(() => import('@/themes/SkillShelf/documents/hackathons').then(({ HackathonEntity }) => {
            return HackathonEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.content?.image) }]
            }
        })
    },
    publications: {
        component: dynamic(() => import('@/themes/SkillShelf/documents/publications').then(({ PublicationEntity }) => {
            return PublicationEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.content?.image) }]
            }
        })
    },
    researches: {
        component: dynamic(() => import('@/themes/SkillShelf/documents/researches').then(({ ResearchEntity }) => {
            return ResearchEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.description! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: getMediaUrl(doc?.meta?.image ?? doc?.content?.image) }]
            }
        })
    },
}