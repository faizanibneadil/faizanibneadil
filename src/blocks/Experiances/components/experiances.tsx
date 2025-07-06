import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { IExperianceProps } from "@/payload-types";

const BLUR_FADE_DELAY = 0.04;
export function Experiance(props:IExperianceProps) {
    const { experiances,blockName,blockType } = props || {}
    return (
        <section id="work" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="text-xl font-bold">Work Experience</h2>
                </BlurFade>
                {experiances?.map((work, id) => (
                    <BlurFade key={work.id} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                        <ResumeCard
                            key={work.id}
                            logoUrl=''
                            altText={work.company as string}
                            title={work.company as string}
                            subtitle={work.title}
                            href={'/'}
                            // badges={work.badges}
                            dates={{ to: work.start, from: work.end }}
                            description={work.description as string}
                        />
                    </BlurFade>
                ))}
            </div>
        </section>
    )
}