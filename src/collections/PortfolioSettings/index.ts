import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import type { CollectionConfig } from "payload";
import { PopulateRootPage } from "./hooks/PopulateRootPage";

export const PortfolioSettings: CollectionConfig<'portfolio-settings'> = {
    slug: 'portfolio-settings',
    fields: [
        {
            type: 'relationship',
            relationTo: 'pages',
            name: 'rootPage',
            label: 'Root Page / Main Page / Lending Page',
            required: true,
            hasMany: false,
            admin: {
                description: "This field defines the 'Home' or 'Landing Page' for your entire Portfolio. By selecting a page here, you are designating it as the entry point of your website. Note: Changing this selection will automatically mark the selected page as the 'Main Page' and remove the 'Main Page' status from any other page for this portfolio to ensure there is always exactly one root page."
            },
            defaultValue: async ({ req }) => {
                // TODO: get selected Tenant from doc
                const selectedTenantId = getTenantFromCookie(req.headers, 'number')
                if (selectedTenantId) {
                    try {
                        const pages = await req.payload.find({
                            collection: 'pages',
                            limit: 1,
                            where: { and: [{ 'tenant.id': { equals: selectedTenantId } }, { isRootPage: { equals: true } }] }
                        })
                        if (pages.docs?.length) {
                            return pages.docs?.at(0)?.id
                        }
                    } catch (error) {
                        req.payload.logger.error({error},'Something went wrong to fetch root page in portfolio settings.')
                        return undefined
                    }
                }
                return undefined
            }
        },
    ],
    hooks: {
        afterChange: [PopulateRootPage()]
    }
}