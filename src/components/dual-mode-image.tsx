import { cn } from "@/lib/utils";
import Image, { StaticImageData, ImageProps } from "next/image";

export type DualModeImageProps = {
    darkSrc: string | StaticImageData
    lightSrc: string | StaticImageData
    className?: string,
} & Omit<ImageProps, 'src'>


export const DualModeImage = ({ darkSrc, lightSrc, className, ...props }: DualModeImageProps) => (
    <>
        <Image
            src={darkSrc}
            className={cn('hidden dark:block', className)}
            {...props}
        />
        <Image
            src={lightSrc}
            className={cn('shadow dark:hidden', className)}
            {...props}
        />
    </>
)