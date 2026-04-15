import { themesRegistry } from "@/themes";
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain";

export default async function Layout(props: React.PropsWithChildren<{
    params: Promise<{
        domain: string
    }>
}>) {
    const params = await props.params
    const themeId = await queryThemeByDomain({
        domain: params.domain
    })
    // console.log({ themeId })

    if (Object.hasOwn(themesRegistry, themeId)) {
        const Layout = themesRegistry[themeId]?.config?.layout

        return <Layout {...props} params={params} themeId={themeId} />
    }

    return 'Theme is not selected'
}