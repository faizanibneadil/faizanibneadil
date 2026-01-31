import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { License } from "@/payload-types";
import { Dates } from "./dates";
import { getMediaUrl } from "@/utilities/getURL";
import type { BlockParams } from "@/types";
import RichText from "./RichText";

export async function LicenseCard(props: { license: License } & BlockParams) {
  const {
    license,
    params: paramsFromProps,
    searchParams: searchParamsFromProps
  } = props || {}

  const {
    image,
    issuingAuthority,
    licenseNumber,
    title,
    validity,
    description,
    location,
    resources
  } = license


  const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
  const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage fetchPriority="high" loading="lazy" src={getMediaUrl(image)} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <Dates to={validity?.issuedDate} from={validity?.expiryDate} />
        <h2 className="font-semibold leading-none">{title}</h2>
        {location && (
          <p className="text-sm text-muted-foreground">{location}</p>
        )}
        {issuingAuthority && (
          <p className="text-sm text-muted-foreground">{issuingAuthority}</p>
        )}
        {licenseNumber && (
          <p className="text-sm text-muted-foreground">{licenseNumber}</p>
        )}
        {description && (
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <RichText data={description} params={params} searchParams={searchParams} />
          </div>
        )}
      </div>
      {resources && resources.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {resources?.map((link, idx) => (
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
