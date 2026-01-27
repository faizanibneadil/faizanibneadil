import { Page } from "@/payload-types";
import { revalidateTag } from "next/cache";
import { FieldHook } from "payload";

export type PageCollectionSlugQueryFieldHook = () => FieldHook<Page, string, Page['content']>
export const RevalidatePageCollectionSlugQuery: PageCollectionSlugQueryFieldHook = () => {
    return ({ value, previousValue, originalDoc, req: { payload } }) => {
        const domain = typeof originalDoc?.tenant === 'object'
            ? originalDoc?.tenant?.domain
            : originalDoc?.tenant

        const slug = originalDoc?.slug

        if (value !== previousValue) {
            payload.logger.info(`Page collection slug is change from [${previousValue}] to [${value}]`)
            revalidateTag(`query-page-mode-by-${slug}-${domain}`, 'max')
        }
        return value!
    }
}