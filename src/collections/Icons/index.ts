import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";

export const Icons: CollectionConfig<'icons'> = {
    slug: 'icons',
    admin: {
        useAsTitle: 'title',
        // components: {
        //     views: {
        //         list: {
        //             Component: '@/collections/Icons/components/Icons.tsx#Icons'
        //         }
        //     }
        // }
    },
    fields: [
        TitleField(),
        {
            type: 'group',
            name: 'iconSpecs',
            label: 'Icon Spesifications',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'radio',
                            name: 'type',
                            required: true,
                            defaultValue: 'svg',
                            options: [
                                { label: 'Upload SVG File', value: 'svg' },
                                { label: 'SVG Code', value: 'html' }
                            ]
                        }
                    ]
                },
                {
                    type: 'code',
                    name: 'iconCode',
                    label: 'Icon code',
                    admin: {
                        condition: (field, siblings) => {
                            return siblings?.iconSpecs?.type === 'html'
                        }
                    }
                },
                {
                    type: 'relationship',
                    name: 'svg',
                    relationTo: 'media',
                    admin: {
                        condition: (field, siblings) => {
                            return siblings?.iconSpecs?.type === 'svg'
                        }
                    }
                }
            ]
        },
        ...slugField()
    ]
}