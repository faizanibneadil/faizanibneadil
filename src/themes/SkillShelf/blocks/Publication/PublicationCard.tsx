import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Publication } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getURL";
import type { BlockParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { Dates } from "../../components/Dates";
import { SkillShelfRichText } from "../../components/RichText";

export async function PublicationCard(props: { publication: Publication } & BlockParams) {
    const {
        publication,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    const { RouteWithDocSlug } = generateRoute({
        domain: params?.domain as string,
        slug: 'publications',
        docSlug: String(publication?.id)
    })

    return (
        <li className="relative ml-10 py-4">
            <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                <Avatar className="border size-12 m-auto">
                    <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(publication?.image)} alt={publication?.title} className="object-contain" />
                    <AvatarFallback>{publication?.title[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1">
                <Dates to={publication?.publishedDate} />
                <h2 className="font-semibold leading-none">
                    <Link href={{ pathname: RouteWithDocSlug }}>{publication?.title}</Link>
                </h2>
                {publication?.publisher && (
                    <p className="text-sm text-muted-foreground">{publication?.publisher}</p>
                )}
                {publication?.type && (
                    <p className="text-sm text-muted-foreground">{publication?.type}</p>
                )}
                {publication?.doi && (
                    <p className="text-sm text-muted-foreground">{publication?.doi}</p>
                )}
                <SkillShelfRichText className="text-xs" data={publication?.description} params={params} searchParams={searchParams} />
            </div>
            {publication?.resources && publication?.resources.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {publication?.resources?.map((link, idx) => (
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
