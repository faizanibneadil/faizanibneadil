import { PagePropsWithParams } from "@/types"
import { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'educations'>, params: Awaited<PagePropsWithParams['params']>
}
export function EducationEntity(props: Props) {
    const { entity, params } = props
    return null
}