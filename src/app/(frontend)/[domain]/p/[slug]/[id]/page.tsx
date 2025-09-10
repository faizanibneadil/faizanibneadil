import React from "react"
import dynamic from "next/dynamic"
import type { PagePropsWithParams } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import { CollectionSlug, DataFromCollectionSlug } from "payload"


type TCollectionComponents = {
    [K in CollectionSlug]?: React.ComponentType<{ entity: DataFromCollectionSlug<K>, params: Awaited<PagePropsWithParams['params']> }>
}

const _Collection: TCollectionComponents = {
    blogs: dynamic(() => import('@/collections/Blogs/components/entity').then(({ BlogEntity }) => {
        return BlogEntity
    })),
    notes: dynamic(() => import('@/collections/Notes/components/entity').then(({ NoteEntity }) => {
        return NoteEntity
    })),
    projects: dynamic(() => import('@/collections/Projects/components/entity').then(({ ProjectEntity }) => {
        return ProjectEntity
    })),
    achievements: dynamic(() => import('@/collections/Achievements/components/entity').then(({ AchievementEntity }) => {
        return AchievementEntity
    })),
    certifications: dynamic(() => import('@/collections/Certifications/components/entity').then(({ CertificationEntity }) => {
        return CertificationEntity
    })),
    educations: dynamic(() => import('@/collections/Educations/components/entity').then(({ EducationEntity }) => {
        return EducationEntity
    })),
    hackathons: dynamic(() => import('@/collections/Hackathons/components/entity').then(({ HackathonEntity }) => {
        return HackathonEntity
    })),
    licenses: dynamic(() => import('@/collections/Licenses/components/entity').then(({ LicenseEntity }) => {
        return LicenseEntity
    })),
    publications: dynamic(() => import('@/collections/Publications/components/entity').then(({ PublicationEntity }) => {
        return PublicationEntity
    })),
    researches: dynamic(() => import('@/collections/Researches/components/entity').then(({ ResearchEntity }) => {
        return ResearchEntity
    })),
    skills: dynamic(() => import('@/collections/Skills/components/entity').then(({ SkillEntity }) => {
        return SkillEntity
    }))
}

export default async function Page(props: PagePropsWithParams) {
    const params = await props.params
    const entity = await queryEntityById({ params: props.params })
    const Collection = params?.slug ? _Collection[params.slug!] : () => null
    // @ts-expect-error
    return <Collection entity={entity} params={params} />
}

const queryEntityById = React.cache(async (args: PagePropsWithParams) => {
    const params = await args.params
    const payload = await getPayloadConfig()
    const entity = await payload.find({
        collection: params.slug!,
        limit: 1,
        pagination: false,
        where: {
            and: [
                {
                    slug: {
                        equals: params.id
                    }
                },
                {
                    'tenant.slug': {
                        equals: params.domain
                    }
                }
            ]
        }
    })
    return entity?.docs?.at(0) || null
})