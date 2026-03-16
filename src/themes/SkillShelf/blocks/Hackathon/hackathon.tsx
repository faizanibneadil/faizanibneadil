import { RichText } from '@payloadcms/richtext-lexical/react';
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { SectionPresentationCard } from '../../components/SectionPresentationCard';

const BLUR_FADE_DELAY = 0.04;
export async function Hackathon(props: BlockProps<'hackathon'>) {
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
        hackathons,
        id
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="hackathons" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

<SectionPresentationCard heading={heading} label='Hackathons' description={description} />

            <div className='rounded-lg border bg-background'>

                <ul className=" divide-y divide-dashed">
                    {hackathons?.map((hackathon, id) => {
                        return typeof hackathon === 'number' ? null : (

                            <HackathonCard key={hackathon.id} {...hackathon} />

                        )
                    })}
                </ul>
            </div>

        </section>
    )
}