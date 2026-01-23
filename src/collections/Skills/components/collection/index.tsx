import type { CollectionProps } from "@/types"
import { generateRoute } from "@/utilities/generateRoute"
import Link from "next/link"

export async function Skills(props: CollectionProps<'skills'>) {
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
            <div key={doc.id} className="flex flex-col gap-4">
                <Link href={{ pathname: RouteWithDocSlug }}><h3>{doc.title}</h3></Link>
                <p>Short Descriptin Of The Skills</p>
            </div>
        )
    })
    return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
}