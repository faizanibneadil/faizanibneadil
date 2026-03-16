// import { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import Navbar from "@/themes/Magic/components/navbar";
import dynamic from "next/dynamic";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { themesRegistry } from "@/themes";
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain";

const TawkChatBubble = dynamic(() => import("@/collections/Integration/components/tawk-chat-bubbles").then(({ TawkChatBubble }) => ({
    default: TawkChatBubble
})));


export default async function Layout(props: React.PropsWithChildren<{ params: Promise<{ domain: string }> }>) {
    const {
        params: paramsFromProps,
        children
    } = props || {}

    const params = await paramsFromProps
    const themeID = await queryThemeByDomain(params.domain)


    if (Object.hasOwn(themesRegistry, themeID)) {
        const components = themesRegistry[themeID]?.components
        const Layout = themesRegistry[themeID]?.layout

        console.log({ themeID })

        return <Layout {...props} components={components} themeID={themeID} />
    }

    return 'Theme is not selected'


    // return (
    //     <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
    //         {children}
    //         {Navbar && <Navbar params={paramsFromProps as any} />}
    //         <ErrorBoundary fallback={null}>
    //             <Suspense fallback={null}>
    //                 <TawkChatBubble params={paramsFromProps as any} />
    //             </Suspense>
    //         </ErrorBoundary>
    //     </div>
    // )
}