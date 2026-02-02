import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Achievement } from "@/payload-types";
import { Dates } from "./dates";
import { getMediaUrl } from "@/utilities/getURL";
import type { BlockParams } from "@/types";
import RichText from "./RichText";
import { generateRoute } from "@/utilities/generateRoute";

export async function AchievementCard(props: { achievement: Achievement } & BlockParams) {
  const {
    achievement,
    params: paramsFromProps,
    searchParams: searchParamsFromProps
  } = props || {}

  const { title, content } = achievement


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
          <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(content?.image)} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <Dates to={content?.dates?.to} from={content?.dates?.from} />
        <h2 className="font-semibold leading-none">
          <Link href={{ pathname: RouteWithDocSlug}}>{title}</Link>
        </h2>
        {content?.dates?.location && (
          <p className="text-sm text-muted-foreground">{content?.dates?.location}</p>
        )}
        {content?.description && (
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <RichText data={content?.description} params={params} searchParams={searchParams} />
          </div>
        )}
      </div>
      {content?.resources && content?.resources.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {content?.resources?.map((link, idx) => (
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
