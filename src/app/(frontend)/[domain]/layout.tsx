import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "@/components/navbar";
import dynamic from "next/dynamic";

const TawkChatBubble = dynamic(() => import("@/collections/Integration/components/tawk-chat-bubbles").then(({ TawkChatBubble }) => {
    return TawkChatBubble
}));

export default async function Layout({ children, params }: React.PropsWithChildren & { params: Promise<{ domain: string }> }) {
    const { domain } = await params
    return (
        <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
            {children}
            <ErrorBoundary fallback={null}>
                <React.Suspense fallback='loading...'>
                    <Navbar domain={domain} />
                </React.Suspense>
            </ErrorBoundary>
            <TawkChatBubble domain={domain} />
        </div>
    )
}