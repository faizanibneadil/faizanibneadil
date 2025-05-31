import type { GlobalConfig } from "payload";
import { revalidateMenu } from "./hooks/revalidateMenu";

export const Menu: GlobalConfig<'menu'> = {
    slug: 'menu',
    hooks: {
        afterChange: [revalidateMenu],
    },
    fields: [
        {
            type: 'array',
            name: 'menu',
            label: 'Menu',
            maxRows: 4,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'checkbox',
                            label: 'As Collection',
                            name: 'asCollection',
                            defaultValue: false,
                            admin: {
                                description: 'If it is checked then this will be a collection of docs.'
                            }
                        }
                    ]
                },
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