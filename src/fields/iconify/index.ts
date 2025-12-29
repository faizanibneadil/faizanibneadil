import type { Field } from "payload";

export const Iconify: () => Field = () => ({
    type: 'text',
    name: 'iconify',
    label: 'Search icon',
    admin: {
        components: {
            Field: {
                path: '@/fields/iconify/components/field.tsx',
                exportName: 'Iconify'
            },
            Description: {
                path: '@/fields/iconify/components/description.tsx',
                exportName: 'Description'
            }
        },
    }
})