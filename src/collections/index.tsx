import { Suspense, cache } from "react"
import type { CollectionsRegistryProps } from "@/types"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import type { CollectionSlug } from "payload"
import { CollectionsRegistries } from "@/registries"
import { ErrorBoundary } from "react-error-boundary"


export async function CollectionRenderer(props: CollectionsRegistryProps) {
    const {
        page: pageFromProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = await paramsFromProps
    const searchParams = await searchParamsFromProps

    const slugFromConfig = pageFromProps?.content?.configurations?.slug as CollectionSlug
    const domain = params.domain

    const collectionToRenderProps = await queryCollectionBySlug(slugFromConfig, domain!)
    if (Object.hasOwn(CollectionsRegistries, slugFromConfig) && collectionToRenderProps) {
        const CollectionToRender = CollectionsRegistries[slugFromConfig]?.component!
        const Skeleton = CollectionsRegistries[slugFromConfig]?.skeleton!

        return (
            <ErrorBoundary fallback={null}>
                <Suspense fallback={<Skeleton />}>
                    <CollectionToRender
                        // @ts-expect-error
                        collection={collectionToRenderProps}
                        searchParams={searchParamsFromProps}
                        params={paramsFromProps}
                    />
                </Suspense>
            </ErrorBoundary>
        )
    }
    return null
}

const queryCollectionBySlug = cache(async (slug: CollectionSlug, domain: string) => {
    try {
        const isNumericDomain = !Number.isNaN(Number(domain))
        const payload = await getPayloadConfig()
        const result = await payload.find({
            collection: slug!,
            pagination: true,
            where: {
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
            }
        })
        return result || null
    } catch (error) {
        console.error(`Something went wrong to fetch collection from ${slug} of ${domain}`, error)
        return null
    }
})