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
export async function Skill(props: { skill: Skill| Promise<Skill>, id: number, className?: string }) {
    const { skill, id, className } = props || {}
    const skillFromProps = skill instanceof Promise ? await skill : skill
    const icon = typeof skillFromProps?.techstack?.icon === 'number' ? getIconById({ id: skillFromProps?.techstack?.icon}) : skillFromProps?.techstack?.icon 

    return icon ? (
        <Tooltip>
            <TooltipTrigger>
                <IconRenderer icon={icon} className={cn({
                    "[&>svg]:size-4": Boolean(className) === false,
                    [className || '']: Boolean(className) === true
                })} />
            </TooltipTrigger>
            <TooltipContent>
                <p>{skillFromProps?.title}</p>
            </TooltipContent>
        </Tooltip>

    ) : (
        <BlurFade key={skillFromProps?.id} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
            <Badge className="px-1 py-0 text-[10px]" variant="secondary">
                {skillFromProps?.title}
            </Badge>
        </BlurFade>
    )
}

