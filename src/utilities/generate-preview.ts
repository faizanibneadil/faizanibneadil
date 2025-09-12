import type { AppGeneratePreview } from "@/types";
import { generateRoute } from "./generateRoute";
import { getServerSideURL } from "./getURL";
import { CollectionSlug } from "payload";

export const generatePreview: AppGeneratePreview = ({ collection }) => {
    return (doc, { req: { user, headers } }) => {
        const domain = (doc?.tenant as any)?.domain
        const { RouteWithDocSlug, PageRoute } = generateRoute({
            domain,
            slug: collection,
            docSlug: (doc?.pageMode as { mode: 'collection' | 'layout' })?.mode === 'collection'
                ? (doc?.configurations as { slug: CollectionSlug })?.slug ?? doc?.slug as string
                : doc?.slug as string
        })

        switch (collection) {
            case 'pages':
                return getServerSideURL() + PageRoute
            default:
                return getServerSideURL() + RouteWithDocSlug
        }
    }
}