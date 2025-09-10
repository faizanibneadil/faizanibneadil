import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'skills'>, params: Awaited<PagePropsWithParams['params']>
}
export function SkillEntity(props: Props) {
    const { entity, params } = props
    return null
}