import { IconRenderer } from "@/components/ui/icon-renderer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AwaitedBaseParams, BaseParams } from "@/types";
import { getNavbarMenuItems, getNavbarSocialMenuItems } from "@/utilities/getNavbarIByDomain";
import Link from "next/link";
import { NavbarClient } from "./navbar.client";
import { NavLabel } from "./NavLabel.client";
import { ModeToggle } from "@/components/mode-toggle";
import { formatHref } from "@/utilities/fomatHref";
import { queryMenu } from "@/utilities/queries/queryMenu";
import { querySocials } from "@/utilities/queries/querySocials";

export async function Navbar(props: Omit<AwaitedBaseParams, 'searchParams'>) {
  const {
    params
  } = props || {}

  const __menu = await queryMenu({ domain: params.domain })
  const __socials = await querySocials({ domain: params?.domain })

  const MenuList = __menu?.menu?.map((item, idx) => {
    const href = formatHref({
      domain: params.domain,
      item: item
    })
    return (
      <li key={`menu-${idx}`} className="flex items-center justify-center rounded-lg border border-background bg-border p-2">
        <TooltipProvider>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={href} className="flex items-center gap-1 text-sm">
                {item?.iconify && (
                  <IconRenderer icon={item?.iconify} width="1rem" height="1rem" />
                )}
                <NavLabel href={href} label={item.label as string} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item?.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    )
  })

  const SocialList = __socials?.socialsLinks?.map((item, idx) => {
    return <li key={`social-${idx}`} className="flex items-center justify-center rounded-lg border border-background bg-border p-2">
      <TooltipProvider>

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
      </TooltipProvider>
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
        <TooltipProvider>

          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </NavbarClient>
  )
}