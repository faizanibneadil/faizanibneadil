import { deepMerge } from "@/utilities/deepMerge";
import type { Field, TextField } from "payload";

export const Iconify = (overrides: Partial<TextField> = {}): Field => {
    const defaultField: Field = {
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
    }

    return deepMerge(defaultField, overrides)
}