import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { IHackathonProps } from "@/payload-types";
import { IconRenderer } from "./ui/icon-renderer";
import { getClientSideURL } from "@/utilities/getURL";
import { Dates } from "./dates";
import { getIconById } from "@/utilities/getIconById";

type Props = Exclude<Exclude<IHackathonProps['hackathons'], null | undefined>[0], number>

export function HackathonCard({
  dates,
  id,
  image,
  title,
  description,
  links,
  location
}: Props) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage fetchPriority="high" loading="eager" src={image && typeof image === 'object' && image?.url ? image?.url : ''} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <Dates to={dates?.to} from={dates?.from} />
        <h2 className="font-semibold leading-none">{title}</h2>
        {location && (
          <p className="text-sm text-muted-foreground">{location}</p>
        )}
        {description && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground">
            <RichText data={description as SerializedEditorState} />
          </span>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links?.map((link, idx) => (
            <Link href={link.link} key={idx}>
              <Badge key={idx} title={link.label} className="flex gap-2">
                {link?.icon && (
                  <IconRenderer icon={typeof link.icon === 'number' ? getIconById({ id: link.icon }) : link.icon} width="0.75rem" height="0.75rem" />
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
