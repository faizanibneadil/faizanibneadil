import type { DocProps } from "@/types"

export function NoteEntity(props: DocProps<'notes'>) {
    const {
        entity,
        params:paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}
    return null
}