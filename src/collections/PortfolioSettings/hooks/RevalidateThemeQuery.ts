import type { Config, Theme } from "@/payload-types";
import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { revalidatePath, revalidateTag } from "next/cache";
import type { FieldHook, PayloadRequest } from "payload";
import { cache } from "react";

const getDomain = cache(async (req: PayloadRequest, tenantId?: number) => {
    try {
        const tenant = await req.payload?.findByID({
            collection: 'tenants',
            id: tenantId || getTenantFromCookie(req.headers, 'number') as number,
            select: { domain: true },
            req
        })
        return tenant?.domain
    } catch (error) {
        req.payload.logger.warn(error, 'Something went wrong to fetch domain')
        return null
    }
})

export type RevalidateThemeQueryFieldHook = () => FieldHook<Config['collections']['portfolio-settings'], (number | null) | Theme, Config['collections']['portfolio-settings']>
export const RevalidateThemeQuery: RevalidateThemeQueryFieldHook = () => {
    return async ({ value, previousValue, originalDoc, previousDoc, req }) => {
        if (value !== previousValue) {
            req.payload.logger.info('Revalidating theme query.')
            const originalDocDomain = typeof originalDoc?.tenant === 'object'
                ? originalDoc?.tenant?.name
                : await getDomain(req,originalDoc?.tenant)
            // const previousDocDomain = typeof previousDoc?.tenant === 'object'
            //     ? previousDoc?.tenant?.name
            //     : await getDomain(req,previousDoc?.tenant)
            const domain = originalDocDomain 
            //?? previousDocDomain
            console.log({domain})
            revalidateTag(`query-theme-by-${domain}`, 'max')
            revalidatePath(`/${domain}`)
        }
        return value as number
    }
}