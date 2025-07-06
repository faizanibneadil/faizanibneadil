import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProjectProps } from "@/payload-types";
import { getClientSideURL } from "@/utilities/getURL";
import Image from "next/image";
import Link from "next/link";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { IconRenderrer } from "./ui/icon-renderrer";
import { Dates } from "./dates";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import React from "react";

type Props = Exclude<Exclude<IProjectProps['projects'], null | undefined>[0], number>

export function ProjectCard({
  title,
  Skills,
  credential,
  links,
  dates,
  thumbnail,
  visitURL,
  description
}: Props) {
  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
      <Link
        href={visitURL || "#"}
        className="block cursor-pointer"
      >
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
        {thumbnail && (
          <Image
            src={thumbnail && typeof thumbnail === 'object' && thumbnail?.url ? thumbnail?.url : ''}
            alt={title}
            className="h-40 w-full overflow-hidden object-cover object-top"
            fetchPriority="high" 
            loading="eager"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <Dates to={dates?.to} from={dates?.from} />
          <div className="hidden font-sans text-xs underline print:visible">
            {visitURL?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <RichText data={description as SerializedEditorState} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
          <div className="mt-2 flex flex-wrap gap-1">
            {Skills?.map((skill) => {
              return typeof skill === 'number' ? (
                <React.Suspense key={`skill-${skill}`} fallback={<Badge variant="secondary" className="w-6" />}>
                  <Skill id={skill} />
                </React.Suspense>
              ) : (
                <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={skill?.id}>
                  {skill?.title}
                </Badge>
              )
            })}
          </div>
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.link} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link?.icon && (
                    <IconRenderrer icon={link?.icon} className='size-3' />
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


async function Skill(props: { id: number }) {
  const skill = await getSkillById({ id: props.id })
  return (
    <Badge className="px-1 py-0 text-[10px]" variant="secondary">
      {skill?.title}
    </Badge>
  )
}

const getSkillById = React.cache(async ({ id }: { id: number }) => {
  const payload = await getPayloadConfig()
  const skill = await payload.findByID({ collection: 'skills', id, select: { title: true } })
  return skill
})