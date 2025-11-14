import type { PagePropsWithParams } from "@/types"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { hasText } from "@payloadcms/richtext-lexical/shared"
import type { DataFromCollectionSlug } from "payload"

type Props = {
    entity: DataFromCollectionSlug<'blogs'>, params: Awaited<PagePropsWithParams['params']>
}
export function BlogEntity(props: Props) {
    const { entity, params } = props
    return (
        <div>
            <h1>{entity.title}</h1>
            <p className="prose">
                {hasText(entity.content) && (
                    <RichText data={entity.content as SerializedEditorState} />
                )}
            </p>
        </div>
    )
}