import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'achievements'>, params: Awaited<PagePropsWithParams['params']>
}
export function AchievementEntity(props: Props) {
    const { entity, params } = props
    return null
}