import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'hackathons'>, params: Awaited<PagePropsWithParams['params']>
}
export function HackathonEntity(props: Props) {
    const { entity, params } = props
    return null
}