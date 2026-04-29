import { ShelvesMaps } from "@/shelves";
import { queryPortfolioSettings } from "@/utilities/queries/queryPortfolioSettings";
import { Suspense } from "react";

// 1. Ek naya component banayein jo data fetch karega
async function LayoutContent({ paramsPromise, children }: {
    paramsPromise: Promise<{ domain: string }>,
    children: React.ReactNode
}) {
    const params = await paramsPromise;
    const settings = await queryPortfolioSettings({
        domain: params.domain
    });

    const shelfID = typeof settings?.shelf === 'object' ? settings.shelf?.id : settings?.shelf;

    if (shelfID && Object.hasOwn(ShelvesMaps, shelfID)) {
        const DynamicLayout = ShelvesMaps[shelfID]?.config?.layout;
        return <DynamicLayout params={params} themeId={shelfID}>{children}</DynamicLayout>;
    }

    return null;
}

// 2. Main Layout component ab block nahi karega
export default function Layout(props: React.PropsWithChildren<{
    params: Promise<{ domain: string }>
}>) {
    return (
        <Suspense fallback={<div>Loading layout...</div>}>
            <LayoutContent paramsPromise={props.params}>
                {props.children}
            </LayoutContent>
        </Suspense>
    );
}