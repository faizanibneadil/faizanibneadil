import { Header } from "@/components/header"
import { StickyFooter } from "@/components/sticky-footer"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import React from "react"

export const metadata: Metadata = {
    title: 'Portfolio Builder | Own Your Digital Presence',
    description: 'Stand out from the crowd with a bespoke portfolio. Fast, mobile-responsive, and SEO-optimized—built for every industry to showcase excellence and build trust.'
}

export default async function Layout(props: React.PropsWithChildren) {
    const { children } = props || {}
    const isAuthenticated = Boolean((await cookies()).get('payload-token'))
    return (
        <div className="relative w-full">
            <Header isAuthenticated={isAuthenticated} />
            {children}
            <StickyFooter />
        </div>
    )
}