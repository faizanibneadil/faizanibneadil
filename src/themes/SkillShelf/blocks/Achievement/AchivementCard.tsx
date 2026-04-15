import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Achievement } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getURL";
import type { BlockParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { Dates } from "../../components/Dates";
import { SkillShelfRichText } from "../../components/RichText";

export async function AchievementCard(props: { achievement: Achievement } & BlockParams) {
    const {
        achievement,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    const { RouteWithDocSlug } = generateRoute({
        domain: params?.domain as string,
        slug: 'achievements',
        docSlug: String(achievement?.id)
    })

    return (
        <li className="relative ml-10 py-4">
            <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                <Avatar className="border size-12 m-auto">
                    <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(achievement?.image)} alt={achievement?.title} className="object-contain" />
                    <AvatarFallback>{achievement?.title[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1">
                <Dates to={achievement?.dates?.to} from={achievement?.dates?.from} />
                <h2 className="font-semibold leading-none">
                    <Link href={{ pathname: RouteWithDocSlug }}>{achievement?.title}</Link>
                </h2>
                {achievement?.dates?.location && (
                    <p className="text-sm text-muted-foreground">{achievement?.dates?.location}</p>
                )}
                <SkillShelfRichText className="text-xs" data={achievement?.description} params={params} searchParams={searchParams} />
            </div>
            {achievement?.resources && achievement?.resources.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {achievement?.resources?.map((link, idx) => (
                        <Link href={link.link} key={idx}>
                            <Badge key={idx} title={link.label} className="flex gap-2">
                                {link.label}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </li>
    );
}
