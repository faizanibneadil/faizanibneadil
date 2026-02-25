import { CollectionConfig } from "payload";

export const Themes: CollectionConfig<'themes'> = {
    slug: 'themes',
    labels: {
        plural: 'Themes',
        singular: 'Theme'
    },
    fields: [
        {
            type: 'text',
            name: 'theme',
            label: 'Select Theme',
            defaultValue: 'magic',
            admin:{
                components:{
                    Field: '@/collections/Themes/components/ThemeSelector/index.tsx#ThemeSelector'
                }
            }
        }
    ]
}