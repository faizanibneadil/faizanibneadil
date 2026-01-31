import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Certification } from "@/payload-types";
import { Dates } from "./dates";
import { getMediaUrl } from "@/utilities/getURL";
import type { BlockParams } from "@/types";
import RichText from "./RichText";

export async function CertificateCard(props: { certificate: Certification } & BlockParams) {
  const {
    certificate,
    params: paramsFromProps,
    searchParams: searchParamsFromProps
  } = props || {}

  const {
    content,
    title,
  } = certificate


  const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
  const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(content?.image)} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <Dates to={content?.validity?.issuedDate} from={content?.validity?.expiryDate} />
        <h2 className="font-semibold leading-none">{title}</h2>
        {content?.issuer && (
          <p className="text-sm text-muted-foreground">{content?.issuer}</p>
        )}
        {content?.credentialId && (
          <p className="text-sm text-muted-foreground">{content?.credentialId}</p>
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
