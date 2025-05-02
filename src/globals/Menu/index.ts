import type { GlobalConfig } from "payload";

export const Menu: GlobalConfig<'menu'> = {
    slug: 'menu',
    fields: [
        {
            type: 'array',
            name: 'menu',
            label: 'Menu',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label',
                            required: true
                        },
                        {
                            type: 'relationship',
                            relationTo: 'pages',
                            name: 'page',
                            label: 'Page'
                        }
                    ]
                }
            ]
        }
    ]
}