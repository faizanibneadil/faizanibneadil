import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Menu, Social } from '@/payload-types';
import { getCachedGlobal } from '@/utilities/getGlobals';
import Link from "next/link";
import { IconRenderrer } from "@/components/ui/icon-renderrer";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";

export default async function Navbar({ domain }: { domain: string }) {
  const payload = await getPayloadConfig()
  const menu = await payload.find({ collection: 'menus', limit: 1, where: { 'tenant.slug': { equals: domain } } })
  const socials = await payload.find({ collection: 'socials', limit: 1, where: { 'tenant.slug': { equals: domain } } })

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {menu?.docs?.at(0)?.menu?.map(item => {
          const href = item?.page && typeof item?.page === 'object' && item?.page?.slug ? `/${domain}/p/${item?.page?.slug}` : '/'
          return (
            <DockIcon key={item?.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={href} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
                    {item?.icon && (
                      <IconRenderrer icon={item.icon} className='size-4' />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item?.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          )
        })}
        <Separator orientation="vertical" className="h-full" />
        {socials?.docs?.at(0)?.socialsLinks?.map(item => {
          return (
            <DockIcon key={item?.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item?.link} target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
                    {item?.icon && (
                      <IconRenderrer icon={item.icon} className='size-4' />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item?.title}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          )
        })}
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
    </div>
  );
}
