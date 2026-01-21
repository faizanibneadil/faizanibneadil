import React from "react"
import dynamic from "next/dynamic"
import type { PagePropsWithParams } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import type { CollectionSlug, DataFromCollectionSlug } from "payload"
import type { Metadata } from "next"
import { getMediaUrl, getServerSideURL } from "@/utilities/getURL"
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext"

const og = (image: Parameters<typeof getMediaUrl>[0]) => getMediaUrl(image)
const fallbackOg = () => `${getServerSideURL()}/graphics/favicon.svg`

type TCollectionComponents = {
    [K in CollectionSlug]?: {
        component: React.ComponentType<{ entity: DataFromCollectionSlug<K>, params: Awaited<PagePropsWithParams['params']> }>,
        metadata: (args: { doc: DataFromCollectionSlug<K> }) => Metadata | Promise<Metadata>
    }
}

const _Collection: TCollectionComponents = {
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
    notes: {
        component: dynamic(() => import('@/collections/Notes/components/entity').then(({ NoteEntity }) => {
            return NoteEntity
        })),
        metadata: ({ doc }) => ({
            title: doc?.meta?.title || doc?.title,
            description: doc?.meta?.description || convertLexicalToPlaintext({ data: doc?.content?.content! }),
            openGraph: {
                type: 'article',
                title: doc?.meta?.title || '',
                description: doc?.meta?.description || '',
                images: [{ url: og(doc?.meta?.image) ?? fallbackOg() }]
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
                images: [{ url: og(doc?.meta?.image || doc?.content?.thumbnail) || fallbackOg() }]
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
    educations: {
        component: dynamic(() => import('@/collections/Educations/components/entity').then(({ EducationEntity }) => {
            return EducationEntity
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
    licenses: {
        component: dynamic(() => import('@/collections/Licenses/components/entity').then(({ LicenseEntity }) => {
            return LicenseEntity
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
    // skills: {
    //     component: dynamic(() => import('@/collections/Skills/components/entity').then(({ SkillEntity }) => {
    //         return SkillEntity
    //     })),
    //     metadata: ({doc}) => ({})
    // }
}

export async function generateMetadata(props: PagePropsWithParams): Promise<Metadata> {
    const params = await props.params

    const slug = params.slug as CollectionSlug
    const domain = params.domain
    const docId = params.id
    const doc = await queryEntityById(slug, domain!, docId!)

    if (slug in _Collection) {
        const metadata = _Collection[params.slug!]?.metadata
        // @ts-expect-error
        return metadata({ doc })
    }


    return {}
}

export default async function Page(props: PagePropsWithParams) {
    const params = await props.params

    const slug = params.slug as CollectionSlug
    const domain = params.domain
    const docId = params.id
    const entity = await queryEntityById(slug, domain!, docId!)

    if (slug in _Collection) {
        const Collection = _Collection[params.slug!]?.component
        // @ts-expect-error
        return <Collection entity={entity} params={params} />
    }

    return null
}

const queryEntityById = React.cache(async (slug: CollectionSlug, domain: string, id: string) => {
    const payload = await getPayloadConfig()
    const entity = await payload.find({
        collection: slug,
        limit: 1,
        pagination: false,
        where: {
            and: [
                {
                    slug: {
                        equals: id
                    }
                },
                {
                    'tenant.slug': {
                        in: [domain]
                    }
                }
            ]
        }
    })
    return entity?.docs?.at(0) || null
})