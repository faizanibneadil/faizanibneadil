import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/themes/Magic/components/resume-card";
import type { BlockProps } from "@/types";

const BLUR_FADE_DELAY = 0.04;
export async function Education(props: BlockProps<'education'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        blockName,
        educations,
        id
    } = blockProps || {}

    return (
        <section id="education" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                    <h2 className="text-xl font-bold">Education</h2>
                </BlurFade>
                {educations?.map((education, id) => {
                    return typeof education === 'number' ? null : (
                        <BlurFade key={education?.id} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                            <ResumeCard blockType="education" key={education?.id} params={params} searchParams={searchParams} educationProps={education}/>
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}