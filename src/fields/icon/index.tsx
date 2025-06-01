import { Field } from "payload";
import { icons } from "lucide-react"

export const iconField: Field = {
    type: 'select',
    name: 'icon',
    label: 'Icon',
    interfaceName: 'TLuciedIcons',
    options: Object.keys(icons).map(icon => ({ label: icon, value: icon })),
}