import { Config, Page } from "@/payload-types";
import { AppCollectionAfterChangeHook } from "@/types";
import { CollectionAfterChangeHook, FieldHook } from "payload";

export const RevalidateAllPagesAfterThemeChange: () => FieldHook<Config['collections']['portfolio-settings'], Config['collections']['portfolio-settings']['theme'], Config['collections']['portfolio-settings']> = () => {
    return async ({ value, previousValue, req, data }) => {
        const logger = req.payload.logger
        const payload = req.payload
        const ctx = req.context

        if (value !== previousValue) {
            payload.logger.info("Theme is changed.")
            if (!ctx.disableRevalidate && value) {
                logger.info("Queueing all pages invalidate task..")
                await payload.jobs.queue({
                    task: 'invalidator',
                    queue: 'invalidator',
                    input: {
                        tenant: data?.tenant,
                        invalidateAllRoutes: true
                    },
                    req
                })
            }
        }

        return value
    }
}