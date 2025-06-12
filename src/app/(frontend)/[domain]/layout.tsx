import Navbar from "@/components/navbar";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Layout({ children,params }: React.PropsWithChildren & { params: Promise<{domain:string}>}) {
    const { domain } = await params
    return (
        <>
            {children}
            <ErrorBoundary fallback={null}>
                <React.Suspense fallback='loading...'>
                    <Navbar domain={domain} />
                </React.Suspense>
            </ErrorBoundary>
        </>
    )
}