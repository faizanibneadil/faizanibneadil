import { DatesProps } from "@/components/dates";
import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { TEducationProps } from "@/payload-types";
import { PagePropsWithParams } from "@/types";
import { getClientSideURL } from "@/utilities/getURL";

const BLUR_FADE_DELAY = 0.04;
export async function Education(props: { blockProps: TEducationProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps: {
            educations,
            blockType,
            blockName
        },
        params: paramsFromProps
    } = props || {}
    const params = await paramsFromProps
    return (
        <section id="education" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                    <h2 className="text-xl font-bold">Education</h2>
                </BlurFade>
                {educations?.map((education, id) => {
                    return typeof education === 'number' ? null : (
                        <BlurFade key={education?.content?.qualification?.academy} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                            <ResumeCard blockType="education" key={education?.content?.qualification?.academy} educationProps={education}/>
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}