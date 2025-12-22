import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { IExperienceProps } from "@/payload-types";
import { PagePropsWithParams } from "@/types";

const BLUR_FADE_DELAY = 0.04;
export async function Experience(props: { blockProps: IExperienceProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps: {
            blockName,
            blockType,
            relatedExperiences: experiences
        },
        params: paramsFromProps
    } = props || {}
    const params = await paramsFromProps
    return (
        <section id="work" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="text-xl font-bold">Work Experience</h2>
                </BlurFade>
                {experiences?.map((work, id) => {
                    return typeof work === 'number' ? null : (
                        <BlurFade key={work.id} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                            <ResumeCard key={work.id} experienceProps={work} blockType="experience" />
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}