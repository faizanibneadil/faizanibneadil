import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getNavbarMenuItems, getNavbarSocialMenuItems } from "@/utilities/getNavbarIByDomain";
import { glimpse } from "./kibo-ui/glimpse/server";
import { GlimpseLink } from "./kibo-ui/glimpse";

/**
 * 
 * TODO: we can split component into 2 to 3 pieces for better performance
 * and loading skeleton and fallback rendering and error handling
 */
export default async function Navbar({ domain }: { domain: string }) {
  const SaaSInfo = glimpse('https://skillshelf.vercel.app')
  const [menu, socials] = await Promise.all([
    getNavbarMenuItems(domain),
    getNavbarSocialMenuItems(domain)
  ])

  const _MenuToRender = menu?.menu?.map(item => {
    const href = item?.page && typeof item?.page === 'object' && item?.page?.slug
      ? `/${domain}/p/${item?.page?.slug}`
      : '/'

    return (
      <DockIcon key={item?.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
              {item.iconify && (
                <IconRenderer icon={item.iconify} width="1rem" height="1rem" />
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item?.label}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    )
  })

  const _SocialsToRender = socials?.socialsLinks?.map(item => {
    return (
      <DockIcon key={item?.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={item?.link} target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
              {item.iconify && (
                <IconRenderer icon={item.iconify} width="1rem" height="1rem" />
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item?.title}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    )
  })

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-1 z-30 mx-auto mb-4 flex flex-col gap-1 origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {_MenuToRender}
        <Separator orientation="vertical" className="h-full" />
        {_SocialsToRender}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
      <GlimpseLink
        fields={{
          url: 'https://skillshelf.vercel.app',
          linkType: 'custom',
          newTab: true,
        }}
        rel={undefined}
        className="z-50 pointer-events-auto relative mx-auto flex items-center text-[0.60rem]/[0.75rem] text-black dark:text-white antialiased no-underline after:content-['_↗'] after:font-bold after:ml-0.5"
        target="_blank"
        getLinkInfo={SaaSInfo}
        label='Crafted by SkillShelf'
      />
    </div>
  );
}
