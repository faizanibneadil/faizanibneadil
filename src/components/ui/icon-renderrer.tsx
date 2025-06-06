import type { TIconProps } from '@/payload-types'
import { icons as lucideIcons, type LucideProps } from 'lucide-react'
import { icons as tablerIcons, IconProps as TablerProps } from '@tabler/icons-react'

export function IconRenderrer(props: (LucideProps | TablerProps) & { icon: TIconProps }) {
    const { icon, ...rest } = props || {}
    const originalIcon = icon?.split('_')[1]
    if (originalIcon && Object.keys(lucideIcons).includes(originalIcon)) {
        const Icon = lucideIcons[originalIcon as keyof typeof lucideIcons]
        return <Icon {...(rest as LucideProps)} />
    }
    if (originalIcon && Object.keys(tablerIcons).includes(originalIcon)) {
        const Icon = tablerIcons[originalIcon as keyof typeof tablerIcons]
        return <Icon {...(rest as TablerProps)} />
    }
    return null
}