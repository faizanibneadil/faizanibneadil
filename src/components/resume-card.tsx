
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Education, Experience } from "@/payload-types";
import { getSkillById } from "@/utilities/getSkillById";
import { getMediaUrl } from "@/utilities/getURL";
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Link2 } from "lucide-react";
import Link from "next/link";
import type { BlockSlug } from "payload";
import React from "react";
import { Dates } from "./dates";
import { Skill, SkillSkeleton } from "./render-skill";

export const ResumeCard = (props: { experienceProps?: Experience, educationProps?: Education } & { blockType?: BlockSlug }) => {
  const {
    blockType
  } = props || {}

  if (blockType === 'experience') {
    const {
      experienceProps: {
        createdAt,
        id,
        title,
        updatedAt,
        company,
        description,
        employmentType,
        end,
        jobType,
        location,
        logo,
        relatedSkills: skillsFromProps,
        start,
        website
      } = {} as Experience
    } = props || {}
    return (
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={getMediaUrl(logo)}
              alt={company as string}
              className="object-contain"
              fetchPriority="high"
              loading="eager"
            />
            <AvatarFallback>{company?.[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-start justify-between gap-x-2 text-base">
              <div className="flex flex-col items-start justify-start font-semibold leading-none text-xs sm:text-sm">
                <h3>{title}</h3>
                {company && (
                  <div className="flex items-center gap-1 group">
                    <Link href={website || "#"} className="font-sans text-xs capitalize font-normal text-muted-foreground group-hover:hover:text-blue-600 group-hover:underline">{company}</Link>
                    <Link2 className="size-3" />
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mt-1">
                  <h3 className="font-normal">TechStack: </h3>
                  {skillsFromProps?.map((skill, idx) => (
                    <React.Suspense key={`skill-${idx}`} fallback={<SkillSkeleton />}>
                      <Skill id={idx} skill={typeof skill === 'number' ? getSkillById({ id: skill }) : skill} />
                    </React.Suspense>
                  ))}
                </div>
              </div>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                <Dates to={start} from={end} />
                {jobType && <div className="font-sans text-xs capitalize">{jobType}</div>}
                {location && <div className="font-sans text-xs capitalize">{location}</div>}
                {employmentType && <div className="font-sans text-xs capitalize">{employmentType}</div>}
              </div>
            </div>
          </CardHeader>
          {description && (
            <RichText data={description} className="mt-2 prose max-w-full text-pretty font-sans text-xs text-foreground dark:prose-invert" />
          )}

        </div>
      </Card>
    );
  }

  if (blockType === 'education') {
    const {
      educationProps: {
        createdAt,
        id,
        content: {
          image,
          dates,
          description,
          qualification,
        } = {} as Education['content'],
        title,
      } = {} as Education
    } = props || {}

    return (
      <Link href="#" className="block cursor-pointer">
        <Card className="flex">
          <div className="flex-none">
            <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
              <AvatarImage
                src={getMediaUrl(image)}
                alt={title}
                className="object-contain"
                fetchPriority="high"
                loading="eager"
              />
              <AvatarFallback>{title?.[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow ml-4 items-center flex-col group">
            <CardHeader>
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                  {title}
                </h3>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                  <Dates to={dates?.to} from={dates?.from} />
                </div>
              </div>
              {qualification?.degree && <div className="font-sans text-xs">{qualification?.degree}</div>}
            </CardHeader>
            {description && (
              <RichText data={description} className="mt-2 prose max-w-full text-pretty font-sans text-xs text-foreground dark:prose-invert" />
            )}
          </div>
        </Card>
      </Link>
    )
  }

  return null
};
