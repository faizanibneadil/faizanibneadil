import type { CollectionConfig } from "payload";

export const PortfolioSettings: CollectionConfig<'portfolio-settings'> = {
    slug: 'portfolio-settings',
    defaultPopulate: {
        shelf: true,
        tenant: true
    },
    fields: [
        {
            type: 'relationship',
            relationTo: 'shelves',
            name: 'shelf',
            label: 'Shelf',
            admin: {
                allowCreate: false,
                allowEdit: false,
                isSortable: false,
            },
        }
    ],
}