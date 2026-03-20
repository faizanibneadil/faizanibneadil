import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Project, Skill } from "@/payload-types";
import type { BlockParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { getSkillById } from "@/utilities/getSkillById";
import { getMediaUrl, placeholderBlur } from "@/utilities/getURL";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { Dates } from "../../components/Dates";
import { SkillShelfRichText } from "../../components/RichText";

export async function ProjectCard(props: { project: Project | Promise<Project> } & BlockParams) {
    const {
        project: projectFromProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}
    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps
    const project = projectFromProps instanceof Promise ? await projectFromProps : projectFromProps
    const { RouteWithDocSlug } = generateRoute({
        domain: params?.domain as string,
        slug: 'projects',
        docSlug: project.slug as string
    })
    // console.log(paramsFromProps)
    return (
        <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
            {/* {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        )} */}
            {project?.content?.thumbnail && (
                <Link href={RouteWithDocSlug}>
                    <Image
                        src={getMediaUrl(project?.content?.thumbnail)}
                        placeholder="blur"
                        blurDataURL={placeholderBlur}
                        alt={project?.title}
                        className="h-40 w-full overflow-hidden object-cover object-top"
                        fetchPriority="high"
                        loading="lazy"
                        height={40}
                        unoptimized
                        width={200}
                    />
                </Link>
            )}
            <CardHeader className="px-2">
                <div className="space-y-1">
                    <CardTitle className="mt-1 text-base">
                        <Link href={RouteWithDocSlug}>
                            {project?.title}
                        </Link>
                    </CardTitle>
                    <Dates to={project?.content?.dates?.to} from={project?.content?.dates?.from} />
                    <div className="prose prose-xs dark:prose-invert w-full text-xs">
                        <SkillShelfRichText data={project?.content?.overview} params={params} searchParams={searchParams} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="mt-auto flex flex-col px-2">
                <div className="mt-2 flex flex-wrap gap-1">
                    {project?.content?.skills?.map((skill, idx) => (
                        <React.Suspense key={`skill-${idx}`} fallback={null}>
                            <RenderProjectSkill skill={typeof skill === 'number' ? getSkillById(skill) : skill} />
                        </React.Suspense>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="px-2 pb-2">
                {project?.content?.links && project?.content?.links.length > 0 && (
                    <div className="flex flex-row flex-wrap items-start gap-1">
                        {project?.content?.links?.map((link, idx) => (
                            <Link href={link?.link} key={idx} target="_blank">
                                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                                    {link?.iconify && (
                                        <IconRenderer icon={link.iconify} />
                                    )}
                                    {link?.label}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}


const RenderProjectSkill = (props: { skill: Skill | Promise<Skill>, width?: string | number, height?: string | number }) => {
    const skill = props.skill instanceof Promise ? use(props.skill) : props.skill
    return skill.icon ? (
        <Tooltip>
            <TooltipTrigger>
                <IconRenderer
                    icon={skill?.icon}
                    width={cn({
                        "1em": Boolean(props.width) === false,
                        [props.width || '']: Boolean(props.width) === true
                    })}
                    height={cn({
                        "1em": Boolean(props.height) === false,
                        [props.height || '']: Boolean(props.height) === true
                    })} />
            </TooltipTrigger>
        </Tooltip>
    ) : (
        <Badge className="px-1 py-0 text-[10px]" variant="secondary">
            {skill?.title}
        </Badge>
    )
}