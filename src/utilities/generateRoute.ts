import type { CollectionSlug } from "payload";

type Args = {
    domain: string | null;
    slug: CollectionSlug | (string & {}) | null | undefined;
};

export function generateRoute({ domain, slug }: Args) {
    return { 
        Route: `${domain}/p/${slug}`, 
        RootRoute: `/${domain}` 
    };
}