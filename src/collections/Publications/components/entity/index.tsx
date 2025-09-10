import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'publications'>, params: Awaited<PagePropsWithParams['params']>
}
export function PublicationEntity(props: Props) {
    const { entity, params } = props
    return null
}