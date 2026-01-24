'use client'
import { LinkFields } from "@payloadcms/richtext-lexical";
import { glimpse } from "@/components/kibo-ui/glimpse/server";
import {
    Glimpse,
    GlimpseContent,
    GlimpseDescription,
    GlimpseImage,
    GlimpseTitle,
    GlimpseTrigger,
} from "@/components/kibo-ui/glimpse";
import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";


export function GlimpseLink(props: { fields: LinkFields } & { rel?: string, target?: string } & { getLinkInfo: ReturnType<typeof glimpse>, label: React.ReactNode, className?: string } & HTMLAttributes<HTMLAnchorElement>) {
    const {
        fields,
        getLinkInfo,
        label,
        className = "font-medium text-primary underline !text-blue-500",
        target,
        rel,
        ...anchorProps
    } = props
    const linkInfo = React.use(getLinkInfo)

    if (linkInfo.title === null && linkInfo.description === null && linkInfo.image === null) {
        return (
            <a className={className} target={target} rel={rel} href={fields?.url ?? '#'} {...anchorProps}>
                {label}
            </a>
        )
    }

    return (
        <Glimpse closeDelay={0} openDelay={0}>
            <GlimpseTrigger asChild>
                <a className={className} target={target} rel={rel} href={fields?.url ?? '#'} {...anchorProps}>
                    {label}
                </a>
            </GlimpseTrigger>
            <GlimpseContent className="w-80 z-[9999]">
                <GlimpseImage src={linkInfo?.image ?? ""} />
                <GlimpseTitle>{linkInfo?.title}</GlimpseTitle>
                <GlimpseDescription>{linkInfo?.description}</GlimpseDescription>
            </GlimpseContent>
        </Glimpse>
    )
}