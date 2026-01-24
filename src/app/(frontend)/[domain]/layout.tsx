import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "@/components/navbar";
import dynamic from "next/dynamic";

const TawkChatBubble = dynamic(() => import("@/collections/Integration/components/tawk-chat-bubbles").then(({ TawkChatBubble }) => ({
    default: TawkChatBubble
})));


export default async function Layout(props: React.PropsWithChildren<{ params: Promise<{ domain: string }> }>) {
    const {
        params: paramsFromProps,
        children
    } = props || {}

    return (
        <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
            {children}
            <Navbar params={paramsFromProps as any} />
            <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                    <TawkChatBubble params={paramsFromProps as any} />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}