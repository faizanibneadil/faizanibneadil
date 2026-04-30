import { ShelvesMaps } from "@/shelves";
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

    const shelfID = typeof settings?.shelf === 'object' ? settings.shelf?.id : settings?.shelf;

    if (shelfID && Object.hasOwn(ShelvesMaps, shelfID)) {
        const Layout = ShelvesMaps[shelfID]?.config?.layout;
        return <Layout params={params} themeId={shelfID}>{children}</Layout>
    }

    return null;
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