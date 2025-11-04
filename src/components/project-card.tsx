import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/payload-types";
import { getIconById } from "@/utilities/getIconById";
import { getSkillById } from "@/utilities/getSkillById";
import { getMediaUrl } from "@/utilities/getURL";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { Dates } from "./dates";
import { Skill, SkillSkeleton } from "./render-skill";
import { IconRenderer } from "./ui/icon-renderer";
import { PagePropsWithParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";

export async function ProjectCard(props: {
  project: Project | Promise<Project>,
  params: Awaited<PagePropsWithParams['params']>
}) {
  const { project: projectFromProps, params: paramsFromProps } = props || {}
  const project = projectFromProps instanceof Promise ? await projectFromProps : projectFromProps
  const { RouteWithDocSlug } = generateRoute({
    domain: paramsFromProps?.domain as string,
    slug: paramsFromProps?.slug === 'home' as string ? 'projects' : paramsFromProps?.slug,
    docSlug: project.slug as string
  })

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
      {project?.thumbnail && (
        <Link href={RouteWithDocSlug}>
          <Image
            src={getMediaUrl(project?.thumbnail)}
            alt={project?.title}
            className="h-40 w-full overflow-hidden object-cover object-top"
            fetchPriority="high"
            loading="eager"
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
          <Dates to={project?.dates?.to} from={project?.dates?.from} />
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <RichText data={project?.overview as SerializedEditorState} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        <div className="mt-2 flex flex-wrap gap-1">
          {project?.Skills?.map((skill, idx) => (
            <React.Suspense key={`skill-${idx}`} fallback={<SkillSkeleton />}>
              <Skill id={idx} skill={typeof skill === 'number' ? getSkillById({ id: skill }) : skill} />
            </React.Suspense>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {project?.links && project?.links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {project?.links?.map((link, idx) => (
              <Link href={link?.link} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link?.icon && (
                    <IconRenderer
                      icon={typeof link?.icon === 'number' ? getIconById({ id: link?.icon }) : link?.icon}
                      className='[&>svg]:size-3' />
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

