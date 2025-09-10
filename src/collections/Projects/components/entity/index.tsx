import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'projects'>, params: Awaited<PagePropsWithParams['params']>
}
export function ProjectEntity(props: Props) {
    const { entity, params } = props
    return null
}