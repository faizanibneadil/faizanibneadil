import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Certification } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getURL";
import type { BlockParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { MagicRichText } from "../../components/RichText";
import { Dates } from "../../components/Dates";
import { formatHref } from "@/utilities/fomatHref";

export async function CertificateCard(props: { certificate: Certification } & BlockParams) {
  const {
    certificate,
    params,
    searchParams
  } = props || {}


  const { RouteWithDocSlug } = generateRoute({
    domain: params?.domain as string,
    slug: 'certifications',
    docSlug: String(certificate?.id)
  })

  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(certificate?.image)} alt={certificate?.title} className="object-contain" />
          <AvatarFallback>{certificate?.title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <Dates to={certificate?.validity?.issuedDate} from={certificate?.validity?.expiryDate} />
        <h2 className="font-semibold leading-none">
          <Link href={{ pathname: RouteWithDocSlug }}>{certificate?.title}</Link>
        </h2>
        {certificate?.issuer && (
          <p className="text-sm text-muted-foreground">{certificate?.issuer}</p>
        )}
        {certificate?.credentialId && (
          <p className="text-sm text-muted-foreground">{certificate?.credentialId}</p>
        )}
        <MagicRichText className="text-xs" data={certificate?.description} params={params} searchParams={searchParams} />
      </div>
      {certificate?.resources && certificate?.resources.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {certificate?.resources?.map((link, idx) => (
            <Link href={formatHref({domain:params.domain,item:link})} key={idx}>
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
