import type { CollectionConfig } from "payload";
import { RevalidateThemeQuery } from "./hooks/RevalidateThemeQuery";
import { RevalidateAllPagesAfterThemeChange } from "./hooks/RevalidateAllPagesAfterThemeChange";

export const PortfolioSettings: CollectionConfig<'portfolio-settings'> = {
    slug: 'portfolio-settings',
    fields: [
        {
            type: 'relationship',
            relationTo: 'themes',
            name: 'theme',
            label: 'Theme',
            admin: {
                allowCreate: false,
                allowEdit: false,
                isSortable: false,
            },
            hooks: {
                afterChange: [
                    RevalidateThemeQuery(),
                    RevalidateAllPagesAfterThemeChange()
                ]
            }
        }
    ],
}