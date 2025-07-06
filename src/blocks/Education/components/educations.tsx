import { DatesProps } from "@/components/dates";
import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { TEducationProps } from "@/payload-types";
import { getClientSideURL } from "@/utilities/getURL";

const BLUR_FADE_DELAY = 0.04;
export function Education(props: TEducationProps) {
    const { educations } = props || {}
    return (
        <section id="education">
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                    <h2 className="text-xl font-bold">Education</h2>
                </BlurFade>
                {educations?.map((education, id) => {
                    return typeof education === 'number' ? null : (
                        <BlurFade key={education?.qualification?.academy} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                            <ResumeCard
                                key={education?.qualification?.academy}
                                href='/'
                                logoUrl={education?.image && typeof education?.image === 'object' && education?.image?.url ? `${getClientSideURL()}/${education?.image?.url}` : ''}
                                altText={education?.qualification?.academy as string}
                                title={education?.qualification?.academy as string}
                                subtitle={education?.qualification?.degree as string}
                                dates={education?.dates as DatesProps}
                            />
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}