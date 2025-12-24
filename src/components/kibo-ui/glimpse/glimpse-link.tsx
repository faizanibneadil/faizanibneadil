'use client'
import { LinkFields, SerializedLinkNode } from "@payloadcms/richtext-lexical";
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
import Link from "next/link";


export function GlimpseLink(props: { fields: LinkFields } & { getLinkInfo: ReturnType<typeof glimpse>, label: React.ReactNode }) {
    // console.log({ props: props.fields })
    const linkInfo = React.use(props.getLinkInfo)

    return (
        <Glimpse closeDelay={0} openDelay={0}>
            <GlimpseTrigger asChild>
                <Link className="font-medium text-primary underline !text-blue-500" href={props.fields?.url ?? '#'}>
                    {props.label}
                </Link>
            </GlimpseTrigger>
            <GlimpseContent className="w-80">
                <GlimpseImage src={linkInfo?.image ?? ""} />
                <GlimpseTitle>{linkInfo?.title}</GlimpseTitle>
                <GlimpseDescription>{linkInfo?.description}</GlimpseDescription>
            </GlimpseContent>
        </Glimpse>
    )
}