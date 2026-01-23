import type { DocProps } from "@/types"

export async function PublicationEntity(props: DocProps<'publications'>) {
    const {
        entity,
        params:paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps
    return null
}