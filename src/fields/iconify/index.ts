import type { Field } from "payload";

export const Iconify: () => Field = () => ({
    type: 'text',
    name: 'iconify',
    label: 'Search icon',
    admin: {
        width: '50%',
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