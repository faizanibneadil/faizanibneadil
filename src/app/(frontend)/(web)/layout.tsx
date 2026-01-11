import { Header } from "@/components/header"
import { StickyFooter } from "@/components/sticky-footer"
import { HeroSection1 } from "@/components/ui/hero-section-1"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import { cookies } from "next/headers"
import React from "react"

export default async function Layout(props: React.PropsWithChildren) {
    const { children } = props || {}
    // const payload = await getPayloadConfig()
    // const getFields = payload.find({ collection: 'industries', pagination: false, select: { title: true, slug: true } })
    const isAuthenticated = Boolean((await cookies()).get('payload-token'))
    return (
        <div className="relative w-full">
            <Header isAuthenticated={isAuthenticated} />
            {/* <div className="flex h-screen flex-col items-center justify-center gap-10"> */}
                {children}
                {/* <div className="flex items-center gap-2">
					<p>Scroll down</p>
					<ArrowDownIcon className="size-4" />
				</div> */}
            {/* </div> */}
            <StickyFooter />
        </div>
    )
}