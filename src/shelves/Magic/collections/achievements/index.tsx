import { AchievementCard } from "@/shelves/Magic/blocks/Achievement/achievement-card"
import type { CollectionProps } from "@/types"
import { generateRoute } from "@/utilities/generateRoute"
import Link from "next/link"

export async function Achievements(props: CollectionProps<'achievements'>) {
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

    const achievements = docs.map(doc => {
        const { RouteWithDocSlug } = generateRoute({
            domain: params.domain as string,
            slug: params.collectionSlug as string,
            docSlug: params.slug as string
        })
        return <AchievementCard key={doc?.id} achievement={doc} params={params} searchParams={searchParams} />
    })
    return (
        <div className="space-y-12 w-full ">
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {achievements}
            </ul>
        </div>
    )
}