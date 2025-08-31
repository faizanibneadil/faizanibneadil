import { PagePropsWithParams } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import { CollectionSlug, DataFromCollectionSlug } from "payload"
import React from "react"


type TCollectionComponents = {
    [K in CollectionSlug]?: React.ComponentType<{ entity: DataFromCollectionSlug<K>, params: Awaited<PagePropsWithParams['params']> }>
}

function RenderView(params: Awaited<PagePropsWithParams['params']>) {
    return `Render ${params.slug} single view`
}

const _Collection: TCollectionComponents = {
    blogs: ({ params, entity }) => RenderView(params),
    notes: ({ params, entity }) => RenderView(params),
    projects: ({ params, entity }) => RenderView(params),
    achievements: ({ params, entity }) => RenderView(params),
    certifications: ({ params, entity }) => RenderView(params),
    educations: ({ params, entity }) => RenderView(params),
    hackathons: ({ params, entity }) => RenderView(params),
    licenses: ({ params, entity }) => RenderView(params),
    publications: ({ params, entity }) => RenderView(params),
    researches: ({ params, entity }) => RenderView(params),
    skills: ({ params, entity }) => RenderView(params)
}

export default async function Page(props: PagePropsWithParams) {
    const params = (await props.params)
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