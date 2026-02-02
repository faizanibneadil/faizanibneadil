import { ResearchCard } from "@/components/research-card"
import type { CollectionProps } from "@/types"
import { generateRoute } from "@/utilities/generateRoute"

export async function Researches(props: CollectionProps<'researches'>) {
    const {
        collection,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        docs,
        hasNextPage,
        hasPrevPage,
        limit,
        pagingCounter,
        totalDocs,
        totalPages,
        nextPage,
        page,
        prevPage
    } = collection || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    const researches = docs.map(doc => {
        const { RouteWithDocSlug } = generateRoute({
            domain: params.domain as string,
            slug: params.slug as string,
            docSlug: params.id as string
        })
        return <ResearchCard key={doc?.id} research={doc} params={params} searchParams={searchParams} />
    })
    return (
        <div className="space-y-12 w-full ">
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {researches}
            </ul>
        </div>
    )
}