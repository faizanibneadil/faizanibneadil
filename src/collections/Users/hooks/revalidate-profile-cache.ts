import { User } from "@/payload-types";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { revalidateTag } from "next/cache";
import { FieldHook } from "payload";

export type RevalidateProfileHook = () => FieldHook<User, number, User>
export const RevalidateProfileCache: RevalidateProfileHook = () => {
    return async ({ value, previousValue, req}) => {
        const selectedTenant = getTenantFromCookie(req.headers,'number')
        if (value !== previousValue && selectedTenant) {
            const tenant = await req.payload.findByID({
                collection: 'tenants',
                id: selectedTenant,
                select: {
                    domain: true
                },
                req
            })
            revalidateTag(`get-profile-avatar-${tenant.domain}`, 'max')
        }
        return value as number
    }
}