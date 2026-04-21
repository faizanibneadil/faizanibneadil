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
import type { Project } from "@/payload-types";
import { getSkillById } from "@/utilities/getSkillById";
import { getMediaUrl, placeholderBlur } from "@/utilities/getURL";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type { BlockParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { Dates } from "../../components/Dates";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { MagicRichText } from "../../components/RichText";
import { formatHref } from "@/utilities/fomatHref";

export async function ProjectCard(props: { project: Project | Promise<Project> } & BlockParams) {
  const {
    project: projectFromProps,
    params,
    searchParams
  } = props || {}

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
      {project?.thumbnail && (
        <Link href={RouteWithDocSlug}>
          <Image
            src={getMediaUrl(project?.thumbnail)}
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
          <Dates to={project?.dates?.to} from={project?.dates?.from} />
          <div className="prose prose-xs dark:prose-invert w-full text-xs">
            <MagicRichText data={project?.overview} params={params} searchParams={searchParams} />
          </div>
        </div>
      </CardHeader>
      {/* <CardContent className="mt-auto flex flex-col px-2">
        <div className="mt-2 flex flex-wrap gap-1">
          {project?.skills?.map((skill, idx) => (
            <React.Suspense key={`skill-${idx}`} fallback={<SkillSkeleton />}>
              <Skill id={idx} skill={typeof skill === 'number' ? getSkillById(skill) : skill} />
            </React.Suspense>
          ))}
        </div>
      </CardContent> */}
      <CardFooter className="px-2 pb-2">
        {project?.resources && project?.resources.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {project?.resources?.map((link, idx) => (
              <Link href={formatHref({domain:params.domain, item:link})} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
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

