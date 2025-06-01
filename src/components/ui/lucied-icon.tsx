import type { TLuciedIcons } from '@/payload-types'
import { icons, type LucideProps } from 'lucide-react'

export function LucideIcon(props: { luciedProps?: LucideProps, icon: TLuciedIcons }) {
    const { icon, luciedProps = {} } = props || {}
    const Icon = icon && icon in icons ? icons[icon] : () => null
    return <Icon {...luciedProps} />
}