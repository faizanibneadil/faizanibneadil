import { ResearchCard } from "@/shelves/Magic/blocks/Research/research-card"
import type { CollectionProps } from "@/types"
import { generateRoute } from "@/utilities/generateRoute"

export async function Researches(props: CollectionProps<'researches'>) {
    const {
        collection,
        params,
        searchParams
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

    const researches = docs.map(doc => {
        const { RouteWithDocSlug } = generateRoute({
            domain: params.domain as string,
            slug: params.collectionSlug as string,
            docSlug: params.slug as string
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