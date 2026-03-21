import { IconRenderer } from "@/components/ui/icon-renderer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BaseParams } from "@/types";
import { getNavbarMenuItems, getNavbarSocialMenuItems } from "@/utilities/getNavbarIByDomain";
import Link from "next/link";
import { NavbarClient } from "./navbar.client";
import { NavLabel } from "./NavLabel.client";
import { ModeToggle } from "@/components/mode-toggle";

export async function Navbar(props: Omit<BaseParams, 'searchParams'>) {
  const {
    params: paramsFromProps
  } = props || {}

  const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps

  const __menu = await getNavbarMenuItems(params.domain)
  const __socials = await getNavbarSocialMenuItems(params?.domain)

  const MenuList = __menu?.menu?.map((item, idx) => {
    const href = item?.page && typeof item?.page === 'object' && item?.page?.slug
      ? `/${params?.domain}/${item?.page?.slug}`
      : '/'
    return (
      <li key={`menu-${idx}`} className="flex items-center justify-center rounded-lg border border-background bg-border p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} className="flex items-center gap-1 text-sm">
              {item?.iconify && (
                <IconRenderer icon={item?.iconify} width="1rem" height="1rem" />
              )}
              <NavLabel href={href} label={item.label} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item?.label}</p>
          </TooltipContent>
        </Tooltip>
      </li>
    )
  })

  const SocialList = __socials?.socialsLinks?.map((item, idx) => {
    return <li key={`social-${idx}`} className="flex items-center justify-center rounded-lg border border-background bg-border p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={item?.link} target="_blank" className="text-sm">
            {item.iconify && (
              <IconRenderer icon={item.iconify} width="1rem" height="1rem" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{item?.title}</p>
        </TooltipContent>
      </Tooltip>
    </li>
  })

  return (
    <NavbarClient>
      <ul className="flex items-center">
        {MenuList}
      </ul>
      <div className="flex items-center gap-1">

      <ul className="flex items-center gap-2">
        {SocialList}
      </ul>
      <Tooltip>
        <TooltipTrigger asChild>
          <ModeToggle />
        </TooltipTrigger>
        <TooltipContent>
          <p>Theme</p>
        </TooltipContent>
      </Tooltip>
      </div>
    </NavbarClient>
  )
}