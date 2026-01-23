import type { Page } from "@/payload-types";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { APIError, type CollectionBeforeChangeHook } from "payload";

export const ProtectRootPageFromTrash: () => CollectionBeforeChangeHook<Page> = () => {
    return async ({
        req,
        data: doc,
        originalDoc,
        operation
    }) => {
        const isMovingToTrash = operation === 'update' && doc.deletedAt && !originalDoc?.deletedAt;

        if (isMovingToTrash && originalDoc?.isRootPage) {
            const selectedTenantId = getTenantFromCookie(req.headers, 'number');

            const otherRoots = await req.payload.count({
                collection: 'pages',
                where: {
                    and: [
                        { tenant: { equals: selectedTenantId } },
                        { isRootPage: { equals: true } },
                        { id: { not_equals: originalDoc.id } },
                        { deletedAt: { exists: false } }
                    ]
                },
                req,
                overrideAccess: true,
            });

            if (otherRoots.totalDocs === 0) {
                throw new APIError(
                    "Trash Blocked: This page is currently the active Landing Page. You must assign another page as the 'Main Page' before moving this one to trash.",
                    400,
                    undefined,
                    true
                );
            }
        }

        return doc;
    }
}