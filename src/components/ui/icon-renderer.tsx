import type { Icon as IconType } from '@/payload-types'
import { Icon } from '@iconify/react'
// import { getPayloadConfig } from '@/utilities/getPayloadConfig'
// import React from 'react'
// import { Badge } from './badge'

export async function IconRenderer(props: { icon: IconType | Promise<IconType>, width?: string | number, height?: string | number }) {
    const { icon: iconFromProps, height,width } = props || {}
    const icon = iconFromProps instanceof Promise ? await iconFromProps : iconFromProps

    // if (typeof icon === 'number') {
    //     return <React.Suspense fallback={<Badge variant="secondary" className={className} />}>
    //         <FetchIconBeforeRender id={icon} className={className} />
    //     </React.Suspense>
    // }


    return <Icon icon={icon?.title} width={width} height={height} /> //<div className={className} dangerouslySetInnerHTML={{ __html: (icon?.iconSpecs?.iconCode as string) || '<div>No Icon</div>' }} />
}

// async function FetchIconBeforeRender(props: { id: number, className: string }) {
//     const { id, className } = props || {}
//     const fetchIcon = await getIconById({ id })
//     return <div className={className} dangerouslySetInnerHTML={{ __html: (fetchIcon?.iconSpecs?.iconCode as string) || '<div>No Icon</div>' }} />
// }


