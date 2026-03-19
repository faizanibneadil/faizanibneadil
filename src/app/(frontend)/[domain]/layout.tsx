// import { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import Navbar from "@/themes/Magic/components/navbar";
import dynamic from "next/dynamic";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { themesRegistry } from "@/themes";
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain";




export default async function Layout(props: React.PropsWithChildren<{ params: Promise<{ domain: string }> }>) {
    const {
        params: paramsFromProps,
        children
    } = props || {}

    const params = await paramsFromProps
    const themeId = await queryThemeByDomain(params.domain)


    if (Object.hasOwn(themesRegistry, themeId)) {
        const componentsMap = themesRegistry[themeId]?.config?.componentsMap
        const Layout = themesRegistry[themeId]?.config?.layout

        console.log({ themeId })

        return <Layout {...props} config={{ componentsMap, params: paramsFromProps, themeId }} />
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