import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/shelves/Magic/components/resume-card";
import type { BlockProps } from "@/types";

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
        <section id="work" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="text-xl font-bold">Work Experience</h2>
                </BlurFade>
                {experiences?.map((work, id) => {
                    return typeof work === 'number' ? null : (
                        <BlurFade key={work.id} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                            <ResumeCard key={work.id} experienceProps={work} blockType="experience" params={params} searchParams={searchParams} />
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}