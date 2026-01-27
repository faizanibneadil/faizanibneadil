import { Form } from "@/payload-types"
import { revalidateTag } from "next/cache"
import { CollectionAfterChangeHook } from "payload"

export type RevalidateFormByIdHook = () => CollectionAfterChangeHook<Form>
export const RevalidateFormById: RevalidateFormByIdHook = () => {
    return ({ doc, req: { payload: { logger } } }) => {
        logger.info(`Revalidating [${doc?.title}] form which [id=${doc?.id}]`)
        revalidateTag(`get-form-by-id-${doc?.id}`, 'max')
        return doc
    }
}