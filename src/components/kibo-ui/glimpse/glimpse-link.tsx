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
import React from "react";


export function GlimpseLink(props: { fields: LinkFields } & { rel?: string, target?: string } & { getLinkInfo: ReturnType<typeof glimpse>, label: React.ReactNode }) {
    const linkInfo = React.use(props.getLinkInfo)

    if (linkInfo.title === null && linkInfo.description === null && linkInfo.image === null) {
        return (
            <a className="font-medium text-primary underline !text-blue-500" target={props.target} rel={props.rel} href={props.fields?.url ?? '#'}>
                {props.label}
            </a>
        )
    }

    return (
        <Glimpse closeDelay={0} openDelay={0}>
            <GlimpseTrigger asChild>
                <a className="font-medium text-primary underline !text-blue-500" target={props.target} rel={props.rel} href={props.fields?.url ?? '#'}>
                    {props.label}
                </a>
            </GlimpseTrigger>
            <GlimpseContent className="w-80">
                <GlimpseImage src={linkInfo?.image ?? ""} />
                <GlimpseTitle>{linkInfo?.title}</GlimpseTitle>
                <GlimpseDescription>{linkInfo?.description}</GlimpseDescription>
            </GlimpseContent>
        </Glimpse>
    )
}