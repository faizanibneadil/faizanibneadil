import RichText from "@/components/RichText"
import { Dates } from "@/components/dates"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { DocProps } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import Link from "next/link"
import { MagicRichText } from "../components/RichText"

export async function PublicationEntity(props: DocProps<'publications'>) {
    const {
        entity,
        params,
        searchParams
    } = props || {}

    return (
        <div className="relative ml-10 py-4">
            <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                <Avatar className="border size-12 m-auto">
                    <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(entity?.image)} alt={entity?.title} className="object-contain" />
                    <AvatarFallback>{entity?.title[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1">
                <Dates to={entity?.publishedDate} />
                <h2 className="font-semibold leading-none">{entity?.title}</h2>
                {entity?.publisher && (
                    <p className="text-sm text-muted-foreground">{entity?.publisher}</p>
                )}
                {entity?.type && (
                    <p className="text-sm text-muted-foreground">{entity?.type}</p>
                )}
                {entity?.doi && (
                    <p className="text-sm text-muted-foreground">{entity?.doi}</p>
                )}
                <MagicRichText className="text-xs" data={entity?.description} params={params} searchParams={searchParams} />
            </div>
            {entity?.resources && entity?.resources.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {entity?.resources?.map((link, idx) => (
                        <Link href={link.link} key={idx}>
                            <Badge key={idx} title={link.label} className="flex gap-2">
                                {link.label}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}