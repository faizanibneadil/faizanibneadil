// import { LivePreviewListener } from "@/components/LivePreviewListener";
// import { Shelves } from "@/components/Shelves";
import { ShelvesMaps } from "@/shelves";
import { queryPortfolioSettings } from "@/utilities/queries/queryPortfolioSettings";
// import { queryShelves } from "@/utilities/queries/queryShelves";
// import { queryShelfByDomain } from "@/utilities/QueryThemeByDomain";
// import { draftMode } from "next/headers";
// import { Suspense } from "react";

export default async function Layout(props: React.PropsWithChildren<{
    params: Promise<{
        domain: string
    }>
}>) {
    // const { isEnabled: draft } = await draftMode()
    const params = await props.params
    const settings = await queryPortfolioSettings({
        domain: params.domain
    })

    const shelfID = typeof settings?.shelf === 'object' ? settings.shelf?.id : settings?.shelf

    if (Object.hasOwn(ShelvesMaps, shelfID!)) {
        const Layout = ShelvesMaps[shelfID!]?.config?.layout

        return (
            <>
                {/* {draft && <LivePreviewListener />} */}
                <Layout {...props} params={params} themeId={shelfID!} />
            </>
        )
    }

    // const queryShelvesPromise = queryShelves()

    return null
    // return (
    //     <Suspense fallback='loading shelves ....'>
    //         <Shelves queryShelves={queryShelvesPromise} />
    //     </Suspense>
    // )
}