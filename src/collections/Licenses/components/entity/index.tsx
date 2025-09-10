import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'licenses'>, params: Awaited<PagePropsWithParams['params']>
}
export function LicenseEntity(props: Props) {
    const { entity, params } = props
    return null
}