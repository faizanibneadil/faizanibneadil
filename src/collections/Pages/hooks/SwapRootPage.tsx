import type { Page } from "@/payload-types";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import type { CollectionAfterChangeHook } from "payload";

export const SwapRootPage: () => CollectionAfterChangeHook<Page> = () => {
    return async ({
        req,
        doc,
        previousDoc,
    }) => {

        if (doc.isRootPage !== true || previousDoc?.isRootPage === true) {
            return doc;
        }

        const selectedTenantId = getTenantFromCookie(req.headers, 'number')
        if (selectedTenantId) {
            try {
                await req.payload.update({
                    collection: 'pages',
                    where: {
                        and: [
                            { tenant: { equals: selectedTenantId } },
                            { isRootPage: { equals: true } },
                            { id: { not_equals: doc.id } },
                        ],
                    },
                    data: { isRootPage: false },
                    req,
                    depth: 0,
                });
                await req.payload.update({
                    collection: 'portfolio-settings',
                    where: { tenant: { equals: selectedTenantId } },
                    data: {
                        rootPage: doc?.id
                    },
                    req
                })
            } catch (error) {
                req.payload.logger.error({ error }, '[SwapRootPage]:Something went wrong')
                return doc
            }
        }
        return doc
    }
}