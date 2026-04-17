import type { BlockProps } from "@/types";
import { SectionPresentationCard } from "../../components/SectionPresentationCard";
import { ResearchCard } from "./ResearchCard";

const BLUR_FADE_DELAY = 0.04;
export async function Research(props: BlockProps<'research'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        description,
        id,
        researches
    } = blockProps || {}

    return (
        <section id="publications" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

            <SectionPresentationCard params={params} searchParams={searchParams} heading={heading} label='Researches' description={description} />

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