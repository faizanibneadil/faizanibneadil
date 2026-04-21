import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IHackathonProps } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getURL";
import { Dates } from "../../components/Dates";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { MagicRichText } from "../../components/RichText";
import type {AwaitedBaseParams, PageProps} from '@/types'
import { formatHref } from "@/utilities/fomatHref";

type Props = Exclude<Exclude<IHackathonProps['hackathons'], null | undefined>[0], number> & AwaitedBaseParams

export function HackathonCard({
  id,
  dates,
  image,
  slug,
  description,
  resources,
  location,
  lockSlug,
  meta,
  skills,
  title,
  createdAt,
  updatedAt,
  deletedAt,
  tenant,
  params,
  searchParams
}: Props) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(image)} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <Dates to={dates?.to} from={dates?.from} />
        <h2 className="font-semibold leading-none">{title}</h2>
        {location && (
          <p className="text-sm text-muted-foreground">{location}</p>
        )}
        <MagicRichText className="text-sm" data={description} params={params} searchParams={searchParams} />
      </div>
      {Boolean(resources) && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {resources?.map((link, idx) => (
            <Link href={formatHref({domain:params.domain, item:link})} key={idx}>
              <Badge key={idx} title={link?.label ?? ''} className="flex gap-2">
                {link.label}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
