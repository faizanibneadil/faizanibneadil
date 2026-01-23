import type { DocProps } from "@/types"

export async function AchievementEntity(props: DocProps<'achievements'>) {
    const {
        entity,
        params:paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps
    return null
}