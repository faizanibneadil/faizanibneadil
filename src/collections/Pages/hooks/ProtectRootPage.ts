import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { APIError, type CollectionBeforeDeleteHook } from "payload";

export const ProtectRootPage: CollectionBeforeDeleteHook = async ({
    req,
    id,
}) => {
    const selectedTenantId = getTenantFromCookie(req.headers, 'number')
    const pageToDelete = await req.payload.findByID({
        collection: 'pages',
        id,
        req,
        depth: 0
    })
    if (pageToDelete?.isRootPage && selectedTenantId) {
        const hasAnotherRootPage = await req.payload.count({
            collection: 'pages',
            where: {
                and: [
                    { tenant: { in: [selectedTenantId] } },
                    { isRootPage: { equals: true, } },
                    { id: { not_equals: id } }
                ]
            },
            req
        })

        if (hasAnotherRootPage?.totalDocs === 0) {
            throw new APIError(
                "Deletion Blocked: At least one Landing Page is required per portfolio. Set another page as 'Main Page' first.",
                400,
                undefined,
                true
            );
        }
    }
}