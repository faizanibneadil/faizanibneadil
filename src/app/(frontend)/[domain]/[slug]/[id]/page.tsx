import type { PageProps } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import type { CollectionSlug } from "payload"
import type { Metadata } from "next"
import { DocRegistries } from "@/registries"
import { cache } from "react"
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain"
import { themesRegistry } from "@/themes"



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
// console.log({entity})
    const themeID = await queryThemeByDomain(domain!)

    if (Object.hasOwn(themesRegistry, themeID)) {
        const components = themesRegistry[themeID]?.components
        const DocumentRenderer = themesRegistry[themeID]?.DocumentRenderer

        // console.log({ themeID })

        return <DocumentRenderer entity={entity} params={props.params} searchParams={props.searchParams} />
    }

    return null
}

const queryEntityById = cache(async (slug: CollectionSlug, domain: string, docSlug: string) => {
    const isNumericDomain = !Number.isNaN(Number(domain))
    const isNumericDocSlug = !Number.isNaN(Number(docSlug))
    const payload = await getPayloadConfig()
    const entity = await payload.find({
        collection: slug,
        limit: 1,
        pagination: false,
        where: {
            and: [
                {
                    [`tenant.${isNumericDomain ? 'id' : 'slug'}`]: {
                        equals: domain
                    }
                },
                {
                    [isNumericDocSlug ? 'id' : 'slug']: {
                        equals: docSlug
                    }
                },
            ],
        },
    })
    return entity?.docs?.at(0) || null
})