import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProjectProps } from "@/payload-types";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { getMediaUrl } from "@/utilities/getURL";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Dates } from "./dates";
import { IconRenderer } from "./ui/icon-renderer";
import { Skill } from "./render-skill";

type Props = Exclude<Exclude<IProjectProps['projects'], null | undefined>[0], number>

export function ProjectCard({
  title,
  Skills,
  credential,
  links,
  dates,
  thumbnail,
  overview,
}: Props) {
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
      {thumbnail && (
        <Image
          src={getMediaUrl(thumbnail)}
          alt={title}
          className="h-40 w-full overflow-hidden object-cover object-top"
          fetchPriority="high"
          loading="eager"
          height={40}
          unoptimized
          width={200}
        />
      )}
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <Dates to={dates?.to} from={dates?.from} />
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <RichText data={overview as SerializedEditorState} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        <div className="mt-2 flex flex-wrap gap-1">
          {Skills?.map((skill, idx) => {
            return <Skill id={idx} skill={skill} key={`skill-${idx}`} />
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
                    <IconRenderer icon={link?.icon} className='[&>svg]:size-3' />
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

