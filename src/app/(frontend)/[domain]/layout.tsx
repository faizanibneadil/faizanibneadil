import Navbar from "@/components/navbar";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            {children}
            <ErrorBoundary fallback={null}>
                <React.Suspense fallback='loading...'>
                    <Navbar />
                </React.Suspense>
            </ErrorBoundary>
        </>
    )
}