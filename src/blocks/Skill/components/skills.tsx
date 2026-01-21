import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Skill as RenderSkill, SkillSkeleton } from "@/components/render-skill";
import type { ISkillProps } from "@/payload-types";
import { getSkillById } from "@/utilities/getSkillById";
import type { PagePropsWithParams } from "@/types";
// import { sdk } from "@/lib/sdk";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";

const BLUR_FADE_DELAY = 0.04;
export async function Skill(props: { blockProps: ISkillProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps: {
            userSkills,
            blockName,
            blockType,
            showAllSkills
        },
        params: paramsFromProps
    } = props || {}
    const params = await paramsFromProps
    let providedSkills = userSkills

    if (showAllSkills === true) {
        try {
            const payload = await getPayloadConfig()
            const getSkills = await payload.find({
                collection: 'skills',
                where: { 'tenant.slug': { in: [params.domain] } },
                pagination: false
            })
            providedSkills = getSkills.docs
        } catch (error) {
            console.error('Something went wrong to get all skills from skills collection in skills block', error)
            providedSkills = userSkills?.length === 0 ? [] : userSkills
        }
    }

    return (
        <section id="skills" aria-label={blockName ?? blockType}>
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                    <h2 className="text-xl font-bold">Skills</h2>
                </BlurFade>
                <div className="flex flex-wrap gap-1">
                    {providedSkills?.map((skill, id) => (
                        <React.Suspense key={`skill-${id}`} fallback={<SkillSkeleton />}>
                            <RenderSkill width='2em' height='2em' skill={typeof skill === 'number' ? getSkillById(skill) : skill} id={id} />
                        </React.Suspense>
                    ))}
                </div>
            </div>
        </section>
    )
}