import { SelectField } from "payload";
import { icons as lucideIcons } from "lucide-react"
import { icons as tablerIcons } from '@tabler/icons-react';

const lucideIconsOptions = Object.keys(lucideIcons).map(icon => ({
    label: icon,
    value: `LUCIDE_${icon}`
}))

const tablerIconsOptions = Object.keys(tablerIcons).map(icon => ({
    label: icon,
    value: `TABLER_${icon}`
}))

export const iconField: SelectField = {
    type: 'select',
    name: 'icon',
    label: 'Icon',
    interfaceName: 'TIconProps',
    options: [...lucideIconsOptions, ...tablerIconsOptions],
    admin: {
        components: {
            Field: '@/fields/icon/components/icon-picker-drawer.tsx#IconPickerDrawer',
        }
    }
}