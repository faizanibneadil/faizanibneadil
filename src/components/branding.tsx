'use client'
import { cn } from "@/lib/utils";
import { isSameProps } from "@/utilities/isSameProps";
import Image, { ImageProps } from "next/image";
import React from "react";

function Brand(props: ImageProps) {
    return (
        <div className={cn("relative", props.className)}>
            <Image {...props}  />
        </div>
    )
}
export const Branding = React.memo(Brand, isSameProps)
Branding.displayName = 'Branding'