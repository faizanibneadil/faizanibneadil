import RichText from "@/components/RichText"
import type { DataFromCollectionSlug } from "payload"
import type { PagePropsWithParams } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { hasText } from "@payloadcms/richtext-lexical/shared"
import { BackButton } from "@/components/BackButton"

type Props = {
    entity: DataFromCollectionSlug<'blogs'>, params: Awaited<PagePropsWithParams['params']>
}
export function BlogEntity(props: Props) {
    const { entity, params } = props
    // console.log({ entity })
    return (
        <div className="space-y-2">

        <div className='w-full flex flex-col gap-4'>
            <img
                className='w-full'
                src={getMediaUrl(entity?.content?.featured_image)}
                alt={entity.title}
            />
            <h1>{entity.title}</h1>
            {hasText(entity?.content?.content) && (
                <RichText params={params} enableGutter={false} data={entity?.content?.content as DefaultTypedEditorState} />  
            )}
        </div>
        </div>
    )
}