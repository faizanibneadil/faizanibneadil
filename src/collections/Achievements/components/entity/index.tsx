import RichText from "@/components/RichText";
import { Dates } from "@/components/dates";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { DocProps } from "@/types"
import { getMediaUrl } from "@/utilities/getURL";
import Link from "next/link";

export async function AchievementEntity(props: DocProps<'achievements'>) {
    const {
        entity,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <div className="relative ml-10 py-4">
            <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                <Avatar className="border size-12 m-auto">
                    <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(entity?.content?.image)} alt={entity?.title} className="object-contain" />
                    <AvatarFallback>{entity?.title[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1">
                <Dates to={entity?.content?.dates?.to} from={entity?.content?.dates?.from} />
                <h2 className="font-semibold leading-none">{entity?.title}</h2>
                {entity?.content?.dates?.location && (
                    <p className="text-sm text-muted-foreground">{entity?.content?.dates?.location}</p>
                )}
                {entity?.content?.description && (
                    <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                        <RichText data={entity?.content?.description} params={params} searchParams={searchParams} />
                    </div>
                )}
            </div>
            {entity?.content?.resources && entity?.content?.resources.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {entity?.content?.resources?.map((link, idx) => (
                        <Link href={link.link} key={idx}>
                            <Badge key={idx} title={link.label} className="flex gap-2">
                                {link.label}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}