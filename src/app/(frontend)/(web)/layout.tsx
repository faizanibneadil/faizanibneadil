import { HeroHeader } from "@/components/header"
import { getPayloadConfig } from "@/utilities/getPayloadConfig"
import { cookies } from "next/headers"
import React from "react"

export default async function Layout(props: React.PropsWithChildren) {
    const { children } = props || {}
    const payload = await getPayloadConfig()
    const getFields = payload.find({ collection: 'industries', pagination: false, select: { title: true, slug:true} })
    const isAuthenticated = (await cookies()).get('payload-token')
    return (
        <>
            <HeroHeader getFields={getFields} isAuthenticated={isAuthenticated?.value} />
            {children}
        </>
    )
}