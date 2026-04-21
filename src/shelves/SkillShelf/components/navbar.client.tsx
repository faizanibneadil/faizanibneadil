'use client'
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function NavbarClient({ children }: React.PropsWithChildren) {
    const scrolled = useScroll(10);

    return (
        <div className={cn("flex items-center justify-between rounded-lg bg-background shadow my-1 sticky top-1 z-[9999] mx-auto transition-all duration-500 ease-in-out w-full max-w-full", {
            "max-w-[270px] md:max-w-xl md:shadow-lg border ": scrolled,
            "md:max-w-4xl": !scrolled,
        })}>
            {children}
        </div>
    )
}