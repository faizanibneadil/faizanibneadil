import { PagePropsWithParams } from "@/types"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { hasText } from "@payloadcms/richtext-lexical/shared"
import { SerializedEditorState } from "node_modules/lexical/LexicalEditorState"
import { DataFromCollectionSlug } from "payload"

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