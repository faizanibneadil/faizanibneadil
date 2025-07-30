import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { TitleField } from "@/fields/title";
import { superAdminOrTenantAdminAccess } from "./access/superAdminOrTenantAdmin";

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
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
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
                        condition: (blocks, siblings) => {
                            console.log({ blocks })
                            return blocks?.iconSpecs?.type === 'html'
                        }
                    }
                },
                {
                    type: 'relationship',
                    name: 'svg',
                    relationTo: 'media',
                    admin: {
                        condition: (blocks, siblings) => {
                            console.log({ blocks })
                            return blocks?.iconSpecs?.type === 'svg'
                        }
                    }
                }
            ]
        },
        ...slugField()
    ]
}