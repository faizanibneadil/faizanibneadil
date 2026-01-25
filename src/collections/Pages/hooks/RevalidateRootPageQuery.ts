import type { Page } from "@/payload-types";
import { revalidateTag } from "next/cache";
import type { FieldHook } from "payload";

export type RootPageQueryFieldHook = () => FieldHook<Page, Page['isRootPage'], Page>
export const RevalidateRootPageQuery: RootPageQueryFieldHook = () => {
    return ({ value, previousValue, originalDoc, previousDoc, req: { payload } }) => {
        if (value !== previousValue) {
            payload.logger.info('Revalidating root page domain query.')
            const originalDocDomain = typeof originalDoc?.tenant === 'object'
                ? originalDoc?.tenant?.name
                : originalDoc?.tenant
            const previousDocDomain = typeof previousDoc?.tenant === 'object'
                ? previousDoc?.tenant?.name
                : originalDoc?.tenant
            const domain = originalDocDomain ?? previousDocDomain
            revalidateTag(`query-root-page-by-${domain}`, 'max')
        }
        return value as boolean
    }
}