import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "@/components/navbar";
import dynamic from "next/dynamic";
// import type { PageProps } from "@/types"

const TawkChatBubble = dynamic(() => import("@/collections/Integration/components/tawk-chat-bubbles").then(({ TawkChatBubble }) => {
    return TawkChatBubble
}));

export default async function Layout(props: React.PropsWithChildren<{ params: Promise<{ domain: string }> }>) {
    const {
        params: paramsFromProps,
        children
    } = props || {}

    const { domain } = await paramsFromProps

    return (
        <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
            {children}
            <ErrorBoundary fallback={null}>
                <Suspense fallback='loading...'>
                    <Navbar domain={domain} />
                </Suspense>
            </ErrorBoundary>
            <TawkChatBubble domain={domain} />
        </div>
    )
}