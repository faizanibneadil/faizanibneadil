import type { CollectionConfig } from "payload";

export const Icons: CollectionConfig<'icons'> = {
    slug: 'icons',
    admin: {
        useAsTitle: 'name',
        components:{
            views:{
                list:{
                    Component: '@/collections/Icons/components/Icons.tsx#Icons'
                }
            }
        }
    },
    fields: [
        {
            type: 'code',
            name: 'iconCode',
            label: 'Icon code',
            required: true,
        },
        {
            type: 'text',
            name: 'name',
            required: true,
            label: 'Icon name',
        },
    ]
}