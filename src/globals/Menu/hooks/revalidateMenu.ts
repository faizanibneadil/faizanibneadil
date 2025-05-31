import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateMenu: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
        payload.logger.info(`Revalidating Menu ....`)
        revalidateTag('global_menu')
    }

    return doc
}