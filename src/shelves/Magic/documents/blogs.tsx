import { BackButton } from "@/components/BackButton"
import RichText from "@/components/RichText"
import type { DocProps } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { hasText } from "@payloadcms/richtext-lexical/shared"
import { MagicRichText } from "../components/RichText"

export async function BlogEntity(props: DocProps<'blogs'>) {
    const {
        entity,
        params,
        searchParams
    } = props || {}

    return (
        <div className="space-y-2">
            <div className="flex gap-4 items-center">
                <BackButton />
                <p className="capitalize font-semibold line-clamp-2">{entity?.title}</p>
            </div>
            <div className='w-full flex flex-col gap-4'>
                <img
                    className='w-full'
                    src={getMediaUrl(entity?.featured_image)}
                    alt={entity?.title}
                />
                <h1>{entity.title}</h1>
                <MagicRichText className="text-xs" data={entity?.content} params={params} searchParams={searchParams} />
                
            </div>
        </div>
    )
}