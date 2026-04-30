import { Menu, Social } from "@/payload-types";
import { queryPortfolioInfoById } from "@/utilities/queries/queryPortfolioInfoById";
import { revalidateTag } from "next/cache";
import { CollectionAfterChangeHook } from "payload";

export const InvalidateSocialsCache: CollectionAfterChangeHook<Social> = async ({
    collection,
    context,
    data,
    doc,
    operation,
    previousDoc,
    req,
    overrideAccess
}) => {
    try {
        const portfolioSlug = typeof doc?.tenant === 'number'
            ? (await queryPortfolioInfoById({ tenantID: doc?.tenant }))?.domain
            : doc?.tenant?.domain

        revalidateTag(`menu_${portfolioSlug}`, 'max')

        return doc
    } catch (error) {
        return doc
    }
}