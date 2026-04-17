import type { BlockProps } from "@/types";
import { SectionPresentationCard } from '../../components/SectionPresentationCard';
import { HackathonCard } from "./HackathonCard";

const BLUR_FADE_DELAY = 0.04;
export async function Hackathon(props: BlockProps<'hackathon'>) {
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
        hackathons,
        id
    } = blockProps || {}

    return (
        <section id="hackathons" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">
            <SectionPresentationCard params={params} searchParams={searchParams} heading={heading} label='Hackathons' description={description} />
            <div className='rounded-lg border bg-background'>
                <ul className=" divide-y divide-dashed">
                    {hackathons?.map((hackathon, id) => {
                        return typeof hackathon === 'number' ? null : (
                            <HackathonCard key={hackathon.id} {...hackathon} params={params} searchParams={searchParams} />
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}