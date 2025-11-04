import type { Icon } from '@/payload-types'
// import { getPayloadConfig } from '@/utilities/getPayloadConfig'
// import React from 'react'
// import { Badge } from './badge'

export async function IconRenderer(props: { icon: Icon | Promise<Icon>, className: string }) {
    const { icon: iconFromProps, className } = props || {}
    const icon = iconFromProps instanceof Promise ? await iconFromProps : iconFromProps

    // if (typeof icon === 'number') {
    //     return <React.Suspense fallback={<Badge variant="secondary" className={className} />}>
    //         <FetchIconBeforeRender id={icon} className={className} />
    //     </React.Suspense>
    // }


    return <div className={className} dangerouslySetInnerHTML={{ __html: (icon?.iconSpecs?.iconCode as string) || '<div>No Icon</div>' }} />
}

// async function FetchIconBeforeRender(props: { id: number, className: string }) {
//     const { id, className } = props || {}
//     const fetchIcon = await getIconById({ id })
//     return <div className={className} dangerouslySetInnerHTML={{ __html: (fetchIcon?.iconSpecs?.iconCode as string) || '<div>No Icon</div>' }} />
// }


