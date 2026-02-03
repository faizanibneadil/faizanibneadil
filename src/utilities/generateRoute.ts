import type { CollectionSlug } from "payload";

type Args = {
    domain: string | null;
    slug: CollectionSlug | (string & {}) | null | undefined;
    id?: string | number
    docSlug?: string
};

export function generateRoute({ domain, slug, id, docSlug }: Args) {
    return {
        Route: `/${domain}/${slug}`,
        PageRoute: `/${domain}/${docSlug}`,
        RouteWithId: `/${domain}/${slug}/${id}`,
        RouteWithDocSlug: `/${domain}/${slug}/${docSlug}`,
        RootRoute: `/${domain}`
    };
}