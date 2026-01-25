import type { Page } from "@/payload-types";
import type { BlockProps } from "@/types";
import { revalidateTag } from "next/cache";
import type { FieldHook } from "payload";

export type ProfileAvatarFieldHookType = () => FieldHook<Page, BlockProps<'hero'>['blockProps']['profile'], BlockProps<'hero'>['blockProps']>
export const RevalidateProfileAvatar: ProfileAvatarFieldHookType = () => {
    return ({ value, previousValue, originalDoc, previousDoc, req: { payload } }) => {
        if (value !== previousValue) {
            payload.logger.info('Revalidating hero block profile avatar.')
            const originalDocDomain = typeof originalDoc?.tenant === 'object'
                ? originalDoc?.tenant?.name
                : originalDoc?.tenant
            const previousDocDomain = typeof previousDoc?.tenant === 'object'
                ? previousDoc?.tenant?.name
                : originalDoc?.tenant
            const domain = originalDocDomain ?? previousDocDomain
            revalidateTag(`get-profile-avatar-${domain}`, 'max')
        }
        return value
    }
}