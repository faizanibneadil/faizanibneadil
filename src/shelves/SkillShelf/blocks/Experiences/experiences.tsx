import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { ExperienceCard } from "./ExperenceCard";

const BLUR_FADE_DELAY = 0.04;
export async function Experience(props: BlockProps<'experience'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        blockName,
        id,
        relatedExperiences: experiences
    } = blockProps || {}

    return (
        <section id="work" aria-label={blockName ?? blockType} className="rounded-lg bg-border shadow">
            <div className="flex flex-col gap-y-3 rounded-lg border bg-background p-4">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="text-xl font-bold">Work Experience</h2>
                </BlurFade>
                {experiences?.map((work, id) => {
                    return typeof work === 'number' ? null : (
                        <BlurFade key={work.id} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                            <ExperienceCard experience={work} params={params} searchParams={searchParams} />
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}