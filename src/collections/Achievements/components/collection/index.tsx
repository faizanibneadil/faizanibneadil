import { AchievementCard } from "@/components/achievement-card"
import type { CollectionProps } from "@/types"
import { generateRoute } from "@/utilities/generateRoute"
import Link from "next/link"

export async function Achievements(props: CollectionProps<'achievements'>) {
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

    const projects = docs.map(doc => {
        const { RouteWithDocSlug } = generateRoute({
            domain: params.domain as string,
            slug: params.slug as string,
            docSlug: params.id as string
        })
        return (
            <div key={doc?.id} className="space-y-12 w-full ">
                <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                    <AchievementCard achievement={doc} params={params} searchParams={searchParams} />
                </ul>
            </div>
        )
    })
    return projects
}