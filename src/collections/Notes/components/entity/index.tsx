import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'notes'>, params: Awaited<PagePropsWithParams['params']>
}
export function NoteEntity(props: Props) {
    const { entity, params } = props
    return null
}