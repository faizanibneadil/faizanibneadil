import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'blogs'>, params: Awaited<PagePropsWithParams['params']>
}
export function BlogEntity(props: Props) {
    const { entity, params } = props
    return 'Display single blog entity...'
}