'use client'

import { Menu } from "@/payload-types";
import { DockIcon } from "./magicui/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { IconRenderrer } from "./ui/icon-renderrer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useParams } from "next/navigation";

export function MenuItem(props: { item: Exclude<Menu['menu'], null | undefined>[0] }) {
    const params = useParams() as { domain: string }
    const item = props?.item
    const href = item?.asCollection && item?.page && typeof item?.page === 'object' && item?.page.slug
        ? `${params?.domain}/c/${item?.page?.slug}`
        : item?.page && typeof item?.page === 'object' && item?.page?.slug
            ? `${params?.domain}/p/${item?.page?.slug}`
            : '/'
    return (
        <DockIcon>
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
}