import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { EducationCard } from "./EducationCard";

const BLUR_FADE_DELAY = 0.04;
export async function Education(props: BlockProps<'education'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        blockName,
        educations,
        id
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="education" aria-label={blockName ?? blockType} className="rounded-lg bg-border shadow">
            <div className="flex flex-col gap-y-3 rounded-lg border bg-background p-4">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="text-xl font-bold">Education</h2>
                </BlurFade>
                {educations?.map((education, id) => {
                    return typeof education === 'number' ? null : (
                        <BlurFade key={education?.id} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                            <EducationCard education={education} params={paramsFromProps} searchParams={searchParamsFromProps} />
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}