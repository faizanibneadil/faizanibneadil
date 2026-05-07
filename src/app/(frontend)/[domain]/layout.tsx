// import { ShelvesMaps } from "@/shelves";
import { getShelfConfig } from "@/utilities/getShelfConfig";
import { queryPortfolioSettings } from "@/utilities/queries/queryPortfolioSettings";
import { Suspense } from "react";

async function RenderLayout({ paramsPromise, children }: {
    paramsPromise: Promise<{ domain: string }>,
    children: React.ReactNode
}) {
    const params = await paramsPromise;
    const settings = await queryPortfolioSettings({
        domain: params.domain
    });

    const { shelfID, ShelfLayout } = getShelfConfig({
        shelf: settings?.shelf
    })

    return Boolean(shelfID)
        ? <ShelfLayout params={params} themeId={shelfID!}>{children}</ShelfLayout>
        : null
}

export default function Layout(props: React.PropsWithChildren<{
    params: Promise<{ domain: string }>
}>) {
    return (
        <Suspense fallback={null}>
            <RenderLayout paramsPromise={props.params}>
                {props.children}
            </RenderLayout>
        </Suspense>
    );
}