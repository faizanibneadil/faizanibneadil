import { themesRegistry } from "@/themes";
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain";




export default async function Layout(props: React.PropsWithChildren<{ params: Promise<{ domain: string }> }>) {
    const {
        params: paramsFromProps,
        children
    } = props || {}

    const params = await paramsFromProps
    const themeId = await queryThemeByDomain(params.domain)
console.log({themeId})

    if (Object.hasOwn(themesRegistry, themeId)) {
        const Layout = themesRegistry[themeId]?.config?.layout

        return <Layout {...props} params={paramsFromProps} themeId={themeId}  />
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