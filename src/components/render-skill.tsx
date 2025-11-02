import { getSkillById } from "@/utilities/getSkillById"
import { Badge } from "./ui/badge"
import { IconRenderer } from "./ui/icon-renderer"
import type { Skill } from "@/payload-types"
import React from "react"
import BlurFade from "./magicui/blur-fade"
import { cn } from "@/lib/utils"


export async function Skill(props: { skill: number | Skill, id: number, className?: string }) {
    const { skill, id, className } = props || {}
    if (typeof skill === 'number') {
        const fetchSkill = await getSkillById({ id: skill })
        return (
            <React.Suspense key={`skill-${skill}`} fallback={<Badge variant="secondary" className="w-6" />}>
                <RenderSkill className={className} id={id} skill={fetchSkill} />
            </React.Suspense>
        )
    }
    return <RenderSkill skill={skill} id={id} className={className} />
}

const BLUR_FADE_DELAY = 0.04;
function RenderSkill(props: { skill: Skill, id: number, className?: string }) {
    const { skill, id, className } = props || {}
    return skill?.techstack?.icon ? (
        <IconRenderer icon={skill?.techstack?.icon} className={cn({
            "[&>svg]:size-4": Boolean(className) === false,
            [className || '']: Boolean(className) === true
        })} />
    ) : (
        <BlurFade key={skill.id} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
            <Badge className="px-1 py-0 text-[10px]" variant="secondary">
                {skill?.title}
            </Badge>
        </BlurFade>

    )
}
