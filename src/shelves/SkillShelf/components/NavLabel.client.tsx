'use client'

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function NavLabel({ label = '', href }: { label: string, href:string }) {
    const pathname = usePathname()

    return <span className={cn('hidden md:inline-block', {
        'block': pathname === href 
    })}>{label}</span>
}