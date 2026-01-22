import type { BlockSlug } from "payload";
import { Building2, Clock, Home, Link2, MapPin } from "lucide-react";
import Link from "next/link";
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Education, Experience } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getURL";
import { Dates } from "./dates";
import { Badge } from "./ui/badge";

export const ResumeCard = (props: { experienceProps?: Experience, educationProps?: Education } & { blockType?: BlockSlug }) => {
  const {
    blockType
  } = props || {}

  if (blockType === 'experience') {
    const {
      experienceProps: {
        title,
        company,
        description,
        employmentType,
        end,
        jobType,
        location,
        logo,
        start,
        website
      } = {} as Experience
    } = props || {}

    const jobTypeIconMap: Record<NonNullable<typeof jobType>, () => React.ReactNode> = {
      "on-site": () => <Building2 className="size-3" />,
      hybrid: () => (
        <div className="flex gap-1 items-center">
          <Building2 className="size-3" />
          <Home className="size-3" />
        </div>
      ),
      remote: () => <Home className="size-3" />
    }
    const JobTypeIcon = jobTypeIconMap[jobType as NonNullable<typeof jobType>]

    return (
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={getMediaUrl(logo)}
              alt={company as string}
              className="object-contain"
              fetchPriority="high"
              loading="lazy"
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
                  {jobType && (
                    <Badge className="flex items-center gap-1 rounded-full" variant='outline'>
                      <JobTypeIcon />
                      <span className="font-sans text-sx capitalize font-normal">{jobType}</span>
                    </Badge>
                  )}
                  {location && (
                    <Badge className="flex items-center gap-1 rounded-full" variant='outline'>
                      <MapPin className="size-3" />
                      <span className="font-sans text-sx capitalize font-normal">{location}</span>
                    </Badge>
                  )}
                  {employmentType && (
                    <Badge className="flex items-center gap-1 rounded-full" variant='outline'>
                      <Clock className="size-3" />
                      <span className="font-sans text-sx capitalize font-normal">{employmentType}</span>
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                <Dates to={start} from={end} />
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
                loading="lazy"
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
