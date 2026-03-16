import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { ResearchCard } from '@/components/research-card';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { SectionPresentationCard } from "../../components/SectionPresentationCard";

const BLUR_FADE_DELAY = 0.04;
export async function Research(props: BlockProps<'research'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        description,
        id,
        researches
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="publications" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

            <SectionPresentationCard heading={heading} label='Researches' description={description} />

            <div className='rounded-lg border bg-background'>

                <ul className=" divide-y divide-dashed">
                    {researches?.map((research, id) => {
                        return typeof research === 'number' ? null : (

                            <ResearchCard key={research.id} params={params} research={research} searchParams={searchParams} />

                        )
                    })}
                </ul>
            </div>

        </section>
    )
}