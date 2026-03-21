import type { Skill } from "@/payload-types"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconRenderer } from "@/components/ui/icon-renderer";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";

export const SkillSkeleton = () => <Badge variant="secondary" className="w-6" />

const BLUR_FADE_DELAY = 0.04;
export async function SkillRenderer(props: { skill: Skill | Promise<Skill>, id: number, width?: string | number, height?: string | number }) {
    const { skill: skillFromProps, id, height, width } = props || {}
    const skill = skillFromProps instanceof Promise ? await skillFromProps : skillFromProps

    if (skill?.enableIcon) {
        return (
            <div className="flex gap-3 items-center rounded-lg border bg-background p-2">
                {skill?.icon && (<Tooltip>
                    <TooltipTrigger>
                        <IconRenderer
                            icon={skill?.icon}
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
                </Tooltip>)}
                <div className="flex flex-col gap-">
                    <p className="text-md">{skill?.title}</p>
                    <p className="text-xs text-muted-foreground">
                        {skill?.enableAchievementsCount && Boolean(skill?.achievements?.docs?.length) && (
                            <span>{skill?.achievements?.docs?.length} Achievements,</span>
                        )}
                        {skill?.enableCertificationsCount && Boolean(skill?.certifications?.docs?.length) && (
                            <span>{skill?.certifications?.docs?.length} Certifications,</span>
                        )}
                        {skill?.enableEducationsCount && Boolean(skill?.educations?.docs?.length) && (
                            <span>{skill?.educations?.docs?.length} Educations,</span>
                        )}
                        {skill?.enableExperiencesCount && Boolean(skill?.experiences?.docs?.length) && (
                            <span>{skill?.experiences?.docs?.length} Experiences,</span>
                        )}
                        {skill?.enableHackathonsCount && Boolean(skill?.hackathons?.docs?.length) && (
                            <span>{skill?.hackathons?.docs?.length} Hackathons,</span>
                        )}
                        {skill?.enableProjectsCount && Boolean(skill?.projects?.docs?.length) && (
                            <span>{skill?.projects?.docs?.length} Projects</span>
                        )}
                    </p>
                </div>
            </div>

        )
    }

    return (
        <BlurFade key={skill?.id} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
            <Badge className="px-1 py-0 text-[10px]" variant="secondary">
                {skill?.title}
            </Badge>
        </BlurFade>
    )
}

