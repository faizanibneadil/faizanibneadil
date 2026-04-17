import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Research } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getURL";
import type { BlockParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { Dates } from "../../components/Dates";
import { SkillShelfRichText } from "../../components/RichText";

export async function ResearchCard(props: { research: Research } & BlockParams) {
    const {
        research,
        params,
        searchParams
    } = props || {}

    const { RouteWithDocSlug } = generateRoute({
        domain: params?.domain as string,
        slug: 'researches',
        docSlug: String(research?.id)
    })

    return (
        <li className="relative ml-10 py-4">
            <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                <Avatar className="border size-12 m-auto">
                    <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(research?.image)} alt={research?.title} className="object-contain" />
                    <AvatarFallback>{research?.title[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1">
                <Dates to={research?.dates?.to} from={research?.dates?.to} />
                <h2 className="font-semibold leading-none">
                    <Link href={{ pathname: RouteWithDocSlug }}>{research?.title}</Link>
                </h2>
                {research?.dates?.location && (
                    <p className="text-sm text-muted-foreground">{research?.dates?.location}</p>
                )}
                {research?.role && (
                    <p className="text-sm text-muted-foreground">{research?.role}</p>
                )}
                {research?.status && (
                    <p className="text-sm text-muted-foreground">{research?.status}</p>
                )}
                <SkillShelfRichText className="text-xs" data={research?.description} params={params} searchParams={searchParams} />
            </div>
            {research?.resources && research?.resources.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {research?.resources?.map((link, idx) => (
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
