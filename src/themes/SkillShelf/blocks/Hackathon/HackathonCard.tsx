import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PageProps } from '@/types'
import { IHackathonProps } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getURL";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { Dates } from "../../components/Dates";
import { SkillShelfRichText } from "../../components/RichText";

type Props = Exclude<Exclude<IHackathonProps['hackathons'], null | undefined>[0], number> & {
  params: Awaited<PageProps['params']>
  searchParams: Awaited<PageProps['searchParams']>
}

export function HackathonCard({
  createdAt,
  dates,
  id,
  image,
  slug,
  title,
  updatedAt,
  deletedAt,
  description,
  links,
  location,
  lockSlug,
  meta,
  skills,
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
        <SkillShelfRichText data={description} params={params} searchParams={searchParams} />
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links?.map((link, idx) => (
            <Link href={link.link} key={idx}>
              <Badge key={idx} title={link.label} className="flex gap-2">
                {link?.iconify && (
                  <IconRenderer icon={link.iconify} width="0.75rem" height="0.75rem" />
                )}
                {link.label}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
