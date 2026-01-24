import { BackButton } from "@/components/BackButton"
import RichText from "@/components/RichText"
import type { DocProps } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { hasText } from "@payloadcms/richtext-lexical/shared"

export async function BlogEntity(props: DocProps<'blogs'>) {
    const {
        entity,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <div className="space-y-2">
            <div className="flex gap-4 items-center">
                <BackButton />
                <p className="capitalize font-semibold line-clamp-2">{entity?.title}</p>
            </div>
            <div className='w-full flex flex-col gap-4'>
                <img
                    className='w-full'
                    src={getMediaUrl(entity?.content?.featured_image)}
                    alt={entity?.title}
                />
                <h1>{entity.title}</h1>
                {hasText(entity?.content?.content) && (
                    <RichText searchParams={searchParams} params={params} enableGutter={false} data={entity?.content?.content as DefaultTypedEditorState} />
                )}
            </div>
        </div>
    )
}