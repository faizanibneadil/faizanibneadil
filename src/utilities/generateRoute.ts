import type { CollectionSlug } from "payload";

type Args = {
    domain: string | null;
    slug: CollectionSlug | (string & {}) | null | undefined;
    id?: string | number
    docSlug?: string
};

export function generateRoute({ domain, slug,id,docSlug }: Args) {
    return { 
        Route: `${domain}/p/${slug}`, 
        RouteWithId: `${domain}/p/${slug}/${id}`,
        RouteWithDocSlug: `${domain}/p/${slug}/${docSlug}`,
        RootRoute: `/${domain}` 
    };
}