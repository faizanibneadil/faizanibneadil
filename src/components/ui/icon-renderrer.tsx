import type { Icon } from '@/payload-types'
import { IconProps as TablerProps } from '@tabler/icons-react'
import { type LucideProps } from 'lucide-react'
import { memo } from 'react'

export const IconRenderrer = memo((
    props: (LucideProps | TablerProps) & { icon: number | Icon }
) => {
    const { icon } = props || {}

    if (typeof icon === 'number') {
        return null
    }


    return <div dangerouslySetInnerHTML={{ __html: icon.iconSpecs.iconCode as string }} />
})

IconRenderrer.displayName = 'IconRenderrer'