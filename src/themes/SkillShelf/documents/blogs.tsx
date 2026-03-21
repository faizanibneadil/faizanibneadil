import { BackButton } from "@/components/BackButton"
import RichText from "@/components/RichText"
import type { DocProps } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { hasText } from "@payloadcms/richtext-lexical/shared"
import { SkillShelfRichText } from "../components/RichText"

export async function BlogEntity(props: DocProps<'blogs'>) {
    const {
        entity,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <div className="rounded-lg bg-border shadow">
            <img
                src={getMediaUrl(entity?.content?.featured_image)}
                alt={entity?.title}
                className='rounded-lg border bg-background w-full'
            />
            <h1 className="rounded-lg border bg-background p-4 text-2xl">{entity.title}</h1>
            <div className="[&>*:not([data-type='block'])]:rounded-lg
    [&>*:not([data-type='block'])]:border
    [&>*:not([data-type='block'])]:bg-background
    [&>*:not([data-type='block'])]:p-4
    [&>br]:hidden">

                <SkillShelfRichText enableGutter={false} data={entity?.content?.content} params={params} searchParams={searchParams} />
            </div>
        </div>
    )
}