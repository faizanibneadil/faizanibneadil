import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Education } from "@/payload-types";
import { BlockProps } from "@/types";
import { getMediaUrl } from "@/utilities/getURL";
import Link from "next/link";
import { Dates } from "../../components/Dates";
import { SkillShelfRichText } from "../../components/RichText";

export async function EducationCard(props: { education: Education } & Omit<BlockProps<'experience'>, 'blockProps'>) {
    const {
        education,
        params,
        searchParams
    } = props || {}

    const {
        createdAt,
        id,
        title,
        updatedAt,
        academy,
        dates,
        degree,
        deletedAt,
        description,
        details,
        image,
        resources,
        skills,
        tenant
    } = education || {}

    return <Link href="#" className="block cursor-pointer">
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
                    {degree && <div className="font-sans text-xs">{degree}</div>}
                </CardHeader>
                <div className="prose prose-xs dark:prose-invert w-full text-sm">
                    <SkillShelfRichText data={description} params={params} searchParams={searchParams} />
                </div>
            </div>
        </Card>
    </Link>
}