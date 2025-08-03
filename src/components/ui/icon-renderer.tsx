import type { Icon } from '@/payload-types'
import { getPayloadConfig } from '@/utilities/getPayloadConfig'
import React from 'react'
import { Badge } from './badge'

export async function IconRenderer(props: { icon: number | Icon, className: string }) {
    const { icon, className } = props || {}

    if (typeof icon === 'number') {
        return <React.Suspense fallback={<Badge variant="secondary" className={className} />}>
            <FetchIconBeforeRender id={icon} className={className} />
        </React.Suspense>
    }


    return <div className={className} dangerouslySetInnerHTML={{ __html: icon.iconSpecs.iconCode as string }} />
}

async function FetchIconBeforeRender(props: { id: number, className: string }) {
    const { id, className } = props || {}
    const fetchIcon = await getIconById({ id })
    return <div className={className} dangerouslySetInnerHTML={{ __html: fetchIcon?.iconSpecs?.iconCode as string }} />
}


const getIconById = React.cache(async ({ id }: { id: number }) => {
    const payload = await getPayloadConfig()
    const icon = await payload.findByID({ collection: 'icons', id })
    return icon
})