import { ShelvesMaps } from "@/shelves";
import { queryPortfolioSettings } from "@/utilities/queries/queryPortfolioSettings";
import { queryShelfByDomain } from "@/utilities/QueryThemeByDomain";

export default async function Layout(props: React.PropsWithChildren<{
    params: Promise<{
        domain: string
    }>
}>) {
    const params = await props.params
    const settings = await queryPortfolioSettings({
        domain: params.domain
    })

    const shelfID = typeof settings?.theme === 'object' ? settings.theme?.id : settings?.theme

    if (Object.hasOwn(ShelvesMaps, shelfID!)) {
        const Layout = ShelvesMaps[shelfID!]?.config?.layout

        return <Layout {...props} params={params} themeId={shelfID!} />
    }

    return 'Theme is not selected'
}