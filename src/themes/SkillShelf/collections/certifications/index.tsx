import { AchievementCard } from "@/components/achievement-card"
import type { CollectionProps } from "@/types"

export async function Certifications(props: CollectionProps<'certifications'>) {
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

    const certificates = docs.map(doc => {
        return <AchievementCard key={doc?.id} achievement={doc} params={params} searchParams={searchParams} />
    })
    return (
        <div className="space-y-12 w-full ">
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {certificates}
            </ul>
        </div>
    )
}