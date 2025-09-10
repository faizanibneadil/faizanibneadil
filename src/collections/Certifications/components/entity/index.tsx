import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'certifications'>, params: Awaited<PagePropsWithParams['params']>
}
export function CertificationEntity(props: Props) {
    const { entity, params } = props
    return null
}