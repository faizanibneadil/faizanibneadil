import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { TEducationProps } from "@/payload-types";

const BLUR_FADE_DELAY = 0.04;
export function Education(props:TEducationProps) {
    const { educations } = props || {}
    return (
        <section id="education">
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                    <h2 className="text-xl font-bold">Education</h2>
                </BlurFade>
                {educations?.map((education, id) => (
                    <BlurFade key={education.academy} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                        <ResumeCard
                            key={education.academy}
                            href='/'
                            logoUrl={''}
                            altText={education.academy as string}
                            title={education.academy as string}
                            subtitle={education.degree as string}
                            period={`${education.start} - ${education.end}`}
                        />
                    </BlurFade>
                ))}
            </div>
        </section>
    )
}