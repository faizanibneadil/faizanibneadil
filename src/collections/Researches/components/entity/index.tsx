import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'researches'>, params: Awaited<PagePropsWithParams['params']>
}
export function ResearchEntity(props: Props) {
    const { entity, params } = props
    return null
}