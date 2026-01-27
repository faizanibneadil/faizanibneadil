import { Page } from "@/payload-types";
import { revalidateTag } from "next/cache";
import { FieldHook } from "payload";

export type PageModeQueryFieldHook = () => FieldHook<Page, Page['content']['pageMode'], Page['content']>
export const RevalidatePageModeQuery: PageModeQueryFieldHook = () => {
    return ({ value, previousValue, originalDoc, req: { payload } }) => {
        const domain = typeof originalDoc?.tenant === 'object'
            ? originalDoc?.tenant?.domain
            : originalDoc?.tenant

        const slug = originalDoc?.slug

        if (value?.mode !== previousValue?.mode) {
            payload.logger.info(`Page mode is change from [${previousValue?.mode}] to [${value?.mode}]`)
            revalidateTag(`query-page-mode-by-${slug}-${domain}`, 'max')
        }
        return value!
    }
}