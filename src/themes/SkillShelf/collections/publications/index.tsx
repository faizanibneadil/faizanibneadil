import { PublicationCard } from "@/themes/Magic/blocks/Publication/publication-card"
import type { CollectionProps } from "@/types"

export async function Publications(props: CollectionProps<'publications'>) {
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

    const publications = docs.map(doc => {
        return <PublicationCard key={doc?.id} publication={doc} params={params} searchParams={searchParams} />
    })
    return (
        <div className="space-y-12 w-full ">
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {publications}
            </ul>
        </div>
    )
}