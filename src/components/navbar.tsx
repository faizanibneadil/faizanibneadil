import { Suspense } from "react";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
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
import type { BaseParams } from "@/types"
import { Skeleton } from "./ui/skeleton";

const FallbackLink = () => (
  <a
    className='text-[0.65rem]/[0.75rem] px-3 py-0.5 after:content-["_↗"] after:ml-1 text-black dark:text-white font-medium'
    target='_blank'
    rel={undefined}
    href='https://skillshelf.vercel.app'
  >
    Crafted by SkillShelf
  </a>
)

export default function Navbar(props: Omit<BaseParams, 'searchParams'>) {
  // const {
  //   params: paramsFromProps,
  // } = props || {}

  // const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps

  const SaaSInfo = glimpse('https://skillshelf.vercel.app')


  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex flex-col gap-1 origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<MenuSkeleton />}>
            <Menu {...props} />
            <Separator orientation="vertical" className="h-full" />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<SocialSkeleton />}>
            <Socials {...props} />
            <Separator orientation="vertical" className="h-full" />
          </Suspense>
        </ErrorBoundary>
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
      <div className="relative w-full flex items-center justify-center">
        <div className="z-50 pointer-events-auto absolute mb-2 rounded-full mx-auto flex items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
          <ErrorBoundary fallback={<FallbackLink />}>
            <Suspense fallback={<FallbackLink />}>
              <GlimpseLink
                fields={{
                  url: 'https://skillshelf.vercel.app',
                  linkType: 'custom',
                  newTab: true,
                }}
                rel={undefined}
                className='text-[0.65rem]/[0.75rem] px-3 py-0.5 after:content-["_↗"] after:ml-1 text-black dark:text-white font-medium'
                target="_blank"
                getLinkInfo={SaaSInfo}
                label='Crafted by SkillShelf'
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export async function Menu(props: Omit<BaseParams, 'searchParams'>) {
  const {
    params: paramsFromProps,
  } = props || {}

  const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps

  const __menu = await getNavbarMenuItems(params.domain)

  const menuToRender = __menu?.menu?.map((menu, idx) => {

    const href = menu?.page && typeof menu?.page === 'object' && menu?.page?.slug
      ? `/${params?.domain}/${menu?.page?.slug}`
      : '/'

    return (
      <DockIcon key={`${menu?.id}-${idx}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
              {menu?.iconify && (
                <IconRenderer icon={menu?.iconify} width="1rem" height="1rem" />
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{menu?.label}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    )
  })

  return menuToRender
}

export async function Socials(props: Omit<BaseParams, 'searchParams'>) {
  const {
    params: paramsFromProps,
  } = props || {}

  const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps

  const __socials = await getNavbarSocialMenuItems(params?.domain)

  const socialsToRender = __socials?.socialsLinks?.map((social, idx) => {
    return (
      <DockIcon key={social?.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={social?.link} target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
              {social.iconify && (
                <IconRenderer icon={social.iconify} width="1rem" height="1rem" />
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{social?.title}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    )
  })

  return socialsToRender
}

export function MenuSkeleton() {
  const skeletonToRender = Array.from({ length: 4 }).map((item, idx) => (
    <DockIcon key={idx} className="gap-2">
      <Skeleton className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8 mr-1")} />
    </DockIcon>
  ))
  return (
    <div className="flex">
      {skeletonToRender}
      <Separator orientation="vertical" className="h-full" />
    </div>
  )
}
export function SocialSkeleton() {
  const skeletonToRender = Array.from({ length: 4 }).map((item, idx) => (
    <DockIcon key={idx} className="gap-2">
      <Skeleton className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8 mr-1")} />
    </DockIcon>
  ))
  return (
    <div className="flex">
      {skeletonToRender}
      <Separator orientation="vertical" className="h-full" />
    </div>
  )
}
