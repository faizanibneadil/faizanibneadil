import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import type { IExperienceProps } from "@/payload-types";
import type { PagePropsWithParams } from "@/types";

const BLUR_FADE_DELAY = 0.04;
export async function Experience(props: { blockProps: IExperienceProps, params: PagePropsWithParams['params'], searchParams: PagePropsWithParams['searchParams'] }) {
    const {
        blockProps: {
            blockName,
            blockType,
            relatedExperiences: experiences,
        },
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}
    const params = await paramsFromProps
    const searchParams = searchParamsFromProps
    return (
        <section id="work" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="text-xl font-bold">Work Experience</h2>
                </BlurFade>
                {experiences?.map((work, id) => {
                    return typeof work === 'number' ? null : (
                        <BlurFade key={work.id} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                            <ResumeCard key={work.id} experienceProps={work} blockType="experience" searchParams={searchParams} />
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}