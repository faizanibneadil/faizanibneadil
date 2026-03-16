import type { Page } from "@/payload-types";
import { __MagicComponents } from "./Magic";
import { __SkillshelfComponents } from "./SkillShelf";
import type { PageProps } from "@/types";
import { SkillShelfBlocksRenderer } from "./SkillShelf/components/BlocksRenderer";
import { MagicBlocksRenderer } from "./Magic/components/BlocksRenderer";
import { MagicCollectionRenderer } from "./Magic/components/CollectionsRenderer";
import { SkillShelfCollectionRenderer } from "./SkillShelf/components/CollectionsRenderer";

export type ThemeID = number
export const themesRegistry: Record<ThemeID, {
    components: typeof __MagicComponents | typeof __SkillshelfComponents,
    layout: React.ComponentType<React.PropsWithChildren & {
        themeID: number,
        params: Promise<{ domain: string }>,
        components: typeof __MagicComponents | typeof __SkillshelfComponents,
    }>,
    page: React.ComponentType<PageProps & {
        isLayout: boolean,
        isCollection: boolean,
        pageContent: Page | null,
        components: typeof __MagicComponents | typeof __SkillshelfComponents,
        themeID: number,
    }>
}> = {
    2: {
        components: __MagicComponents,
        layout: ({ children, themeID, params, components }) => {
            const Navbar = components.navbar
            return (
                <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
                    {children}
                    <Navbar params={params as any} />
                    {/* <ErrorBoundary fallback={null}>
                        <Suspense fallback={null}>
                            <TawkChatBubble params={paramsFromProps as any} />
                        </Suspense>
                    </ErrorBoundary> */}
                </div>
            )
        },
        page: ({
            components,
            isCollection,
            isLayout,
            pageContent,
            params,
            searchParams,
            themeID
        }) => {
            if (isCollection) {
                return <MagicCollectionRenderer page={pageContent} params={params} searchParams={searchParams} />
            }

            if (isLayout) {
                return <MagicBlocksRenderer blocks={pageContent?.content?.layout} params={params} searchParams={searchParams} />
            }

            return 'magic render nothing'
        }
    },
    3: {
        components: __SkillshelfComponents,
        layout: ({ children, components, params }) => {
            const Nav = components.navbar
            return (
                <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto">
                    <Nav params={params as any} />
                    {children}
                </div>
            )
        },
        page: ({
            components,
            isCollection,
            isLayout,
            pageContent,
            params,
            searchParams,
            themeID
        }) => {
            if (isCollection) {
                return <SkillShelfCollectionRenderer page={pageContent} params={params} searchParams={searchParams} />
            }

            if (isLayout) {
                return <SkillShelfBlocksRenderer params={params} blocks={pageContent?.content?.layout} searchParams={searchParams} />
            }

            return 'skillshelf render nothing'
        }
    }
}