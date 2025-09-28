'use client'
import { cn } from "@/lib/utils";
import { isSameProps } from "@/utilities/isSameProps";
import React from "react";
import { DualModeImage, DualModeImageProps } from "./dual-mode-image";

function Brand(props: DualModeImageProps) {
    return (
        <div className={cn("relative", props.className)}>
            <DualModeImage {...props} darkSrc={props.darkSrc} lightSrc={props.lightSrc}  />
        </div>
    )
}
export const Branding = React.memo(Brand, isSameProps)
Branding.displayName = 'Branding'