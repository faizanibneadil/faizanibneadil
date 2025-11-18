import { Badge } from "./ui/badge"
import { IconRenderer } from "./ui/icon-renderer"
import type { Skill } from "@/payload-types"
import BlurFade from "./magicui/blur-fade"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { getIconById } from "@/utilities/getIconById"

export const SkillSkeleton = () => <Badge variant="secondary" className="w-6" />

const BLUR_FADE_DELAY = 0.04;
export async function Skill(props: { skill: Skill | Promise<Skill>, id: number, width?: string|number, height?:string|number}) {
    const { skill: skillFromProps, id, height,width } = props || {}
    const skill = skillFromProps instanceof Promise ? await skillFromProps : skillFromProps
    const icon = typeof skill?.techstack?.icon === 'number' ? getIconById({ id: skill?.techstack?.icon }) : skill?.techstack?.icon

    return icon ? (
        <Tooltip>
            <TooltipTrigger>
                <IconRenderer
                    icon={icon}
                    width={cn({
                        "1em": Boolean(width) === false,
                        [width || '']: Boolean(width) === true
                    })}
                    height={cn({
                        "1em": Boolean(height) === false,
                        [height || '']: Boolean(height) === true
                    })} />
            </TooltipTrigger>
            <TooltipContent>
                <p>{skill?.title}</p>
            </TooltipContent>
        </Tooltip>

    ) : (
        <BlurFade key={skill?.id} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
            <Badge className="px-1 py-0 text-[10px]" variant="secondary">
                {skill?.title}
            </Badge>
        </BlurFade>
    )
}

