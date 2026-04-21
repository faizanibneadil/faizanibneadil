import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Experience } from "@/payload-types";
import { BlockProps } from "@/types";
import { getMediaUrl } from "@/utilities/getURL";
import { Building2, Clock, Home, Link2, MapPin } from "lucide-react";
import Link from "next/link";
import { Dates } from "../../components/Dates";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SkillShelfRichText } from "../../components/RichText";

export async function ExperienceCard(props: { experience: Experience } & Omit<BlockProps<'experience'>, 'blockProps'>) {
    const {
        experience,
        params,
        searchParams
    } = props || {}

    const {
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
        skills,
        start,
        tenant,
        website
    } = experience || {}

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

    return <div className="space-y-2">
        <div className="flex gap-2 items-center justify-between">
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
            <div className="flex flex-col gap-1 flex-1">
                <h3>{title}</h3>
                {company && (
                    <div className="flex items-center gap-1 group">
                        <Link href={website || "#"} className="font-sans text-xs capitalize font-normal text-muted-foreground group-hover:hover:text-blue-600 group-hover:underline">{company}</Link>
                        <Link2 className="size-3" />
                    </div>
                )}
            </div>
            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                <Dates to={start} from={end} />
            </div>
        </div>
        <div className={cn("flex flex-wrap gap-1", {
            "ml-14": searchParams?.vp === 'd'
        })}>
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
        <div className="prose prose-xs dark:prose-invert w-full text-sm">
            <SkillShelfRichText data={description} params={params} searchParams={searchParams} />
        </div>

    </div>
}