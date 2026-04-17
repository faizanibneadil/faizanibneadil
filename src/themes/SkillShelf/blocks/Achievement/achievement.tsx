import type { BlockProps } from "@/types";
import { SectionPresentationCard } from '../../components/SectionPresentationCard';
import { AchievementCard } from "./AchivementCard";

const BLUR_FADE_DELAY = 0.04;
export async function Achievement(props: BlockProps<'achievement'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        heading,
        achievements,
        blockName,
        description,
        id
    } = blockProps || {}

    return (
        <section id="project" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

            <SectionPresentationCard params={params} searchParams={searchParams} heading={heading} label='Achievements' description={description} />

            <div className='rounded-lg border bg-background'>

                <ul className=" divide-y divide-dashed">
                    {achievements?.map((achievement, id) => {
                        return typeof achievement === 'number' ? null : (
                            <AchievementCard key={achievement.id} achievement={achievement} params={params} searchParams={searchParams} />
                        )
                    })}
                </ul>
            </div>

        </section>
    )
}