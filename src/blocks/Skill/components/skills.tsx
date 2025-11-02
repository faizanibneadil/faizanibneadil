import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Skill as RenderSkill, SkillSkeleton } from "@/components/render-skill";
import { ISkillProps } from "@/payload-types";
import { getSkillById } from "@/utilities/getSkillById";

const BLUR_FADE_DELAY = 0.04;
export function Skill(props: ISkillProps) {
    const { userSkills, blockName, blockType } = props || {}
    return (
        <section id="skills" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                    <h2 className="text-xl font-bold">Skills</h2>
                </BlurFade>
                <div className="flex flex-wrap gap-1">
                    {userSkills?.map((skill, id) => (
                        <React.Suspense key={`skill-${id}`} fallback={<SkillSkeleton />}>
                            <RenderSkill className="[&>svg]:size-18" skill={typeof skill === 'number' ? getSkillById({ id: skill }) : skill} id={id} />
                        </React.Suspense>
                    ))}
                </div>
            </div>
        </section>
    )
}