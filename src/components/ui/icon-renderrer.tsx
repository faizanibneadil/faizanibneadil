import type { TIconProps } from '@/payload-types'
import { icons as lucideIcons, type LucideProps } from 'lucide-react'
import { icons as tablerIcons, IconProps as TablerProps } from '@tabler/icons-react'
import { memo } from 'react'

export const IconRenderrer = memo((
    props: (LucideProps | TablerProps) & { icon: TIconProps }
) => {
    const { icon, ...rest } = props || {}
    const _prefix = icon?.split('_')[0] as 'LUCIDE' | 'TABLER'
    const originalIcon = icon?.split('_')[1]

    if (_prefix === 'LUCIDE') {
        const Icon = lucideIcons[originalIcon as keyof typeof lucideIcons]
        return Icon ? <Icon {...(rest as LucideProps)} /> : null
    }

    if (_prefix === 'TABLER') {
        const Icon = tablerIcons[originalIcon as keyof typeof tablerIcons]
        return Icon ? <Icon {...(rest as TablerProps)} /> : null
    }

    return null
})

IconRenderrer.displayName = 'IconRenderrer'