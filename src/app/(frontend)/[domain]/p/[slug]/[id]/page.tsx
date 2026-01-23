import type { PageProps } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import type { CollectionSlug } from "payload"
import type { Metadata } from "next"
import { DocRegistries } from "@/registries"
import { cache } from "react"



export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params

    const slug = params.slug?.split('-')?.at(0) as CollectionSlug
    const domain = params.domain
    const docSlug = params.id
    const doc = await queryEntityById(slug, domain!, docSlug!)

    if (Object.hasOwn(DocRegistries, slug)) {
        const metadata = DocRegistries[slug]?.metadata
        if (typeof metadata === 'function') {
            // @ts-expect-error
            return metadata({ doc })
        }
    }


    return {}
}

export default async function Page(props: PageProps) {
    const params = await props.params

    const slug = params.slug?.split('-').at(0) as CollectionSlug
    const domain = params.domain
    const docSlug = params.id
    const entity = await queryEntityById(slug, domain!, docSlug!)

    if (Object.hasOwn(DocRegistries, slug)) {
        const Collection = DocRegistries[slug]?.component
        // @ts-expect-error
        return <Collection entity={entity} params={params} />
    }

    return null
}

const queryEntityById = cache(async (slug: CollectionSlug, domain: string, docSlug: string) => {
    const isNumericDomain = !Number.isNaN(Number(domain))
    const payload = await getPayloadConfig()
    const entity = await payload.find({
        collection: slug,
        limit: 1,
        pagination: false,
        where: {
            and: [
                {
                    or: [
                        {
                            'tenant.slug': {
                                equals: domain
                            }
                        },
                        ...(isNumericDomain
                            ? [{
                                'tenant.id': {
                                    equals: Number(domain),
                                },
                            }]
                            : []),
                    ]
                },
                {
                    slug: {
                        equals: docSlug
                    }
                },
            ],
        },
    })
    return entity?.docs?.at(0) || null
})