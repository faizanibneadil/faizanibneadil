import { Config } from "@/payload-types";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { CollectionAfterChangeHook } from "payload";

type PortfolioSettings = Config['collections']['portfolio-settings']
export const PopulateRootPage: () => CollectionAfterChangeHook<PortfolioSettings> = () => {
    return async ({
        doc,
        req,
        previousDoc
    }) => {
        const selectedTenantId = getTenantFromCookie(req.headers, 'number')
        const earlierSelectedPage = typeof previousDoc?.rootPage === 'object' ? previousDoc?.rootPage?.id : previousDoc?.rootPage;
        const selectedPage = typeof doc?.rootPage === 'object' ? doc?.rootPage?.id : doc?.rootPage;

        if (!selectedPage || selectedPage === earlierSelectedPage || !selectedTenantId) {
            return doc;
        }

        try {
            // selected page as root page
            await req.payload.update({
                collection: 'pages',
                id: selectedPage,
                data: { isRootPage: true },
                req,
                depth: 0,
            });
            // rest of the pages update as false
            await req.payload.update({
                collection: 'pages',
                where: {
                    and: [
                        { tenant: { in: [selectedTenantId] } },
                        { isRootPage: { equals: true } },
                        { id: { not_equals: selectedPage } },
                    ],
                },
                data: { isRootPage: false },
                req,
                depth: 0,
            });
        } catch (error) {
            req.payload.logger.error({ error }, '[PopulateRootPage]: Something went wrong')
            return doc
        }
        return doc
    }
}