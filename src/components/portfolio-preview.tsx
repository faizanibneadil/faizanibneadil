'use client'
import React from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import { useTenantSelection } from '@payloadcms/plugin-multi-tenant/client'
import { Button, useAuth } from '@payloadcms/ui'
import { useParams } from 'next/navigation'

function toURL(url: string | URL) {
    return new URL(url, getClientSideURL()).toString()
}
function generatePreviewPortfolioRoute(args: { segments: string[], domain: string }) {
    if ('segments' in args && args.segments) {
        switch (args.segments.length) {
            case 0:
            case 1:
            case 2:
                return toURL(args.domain)
            case 3: 
            return toURL(`${args.domain}/${args.segments[1]}`)
            default:
                return toURL(args.domain)
        }
    }
    return toURL(args.domain)
}
export function PortfolioPreview() {

    const params = useParams() as { segments: string[] }

    console.log(params)
    const { user } = useAuth()
    const { selectedTenantID } = useTenantSelection()

    const domain = React.useMemo(() => {
        return user?.tenants?.find((tenant: any) => {
            return tenant?.tenant?.id === selectedTenantID
        })?.tenant?.domain
    }, [selectedTenantID])

    console.log(generatePreviewPortfolioRoute({ domain, segments: params.segments }))

    return <Button buttonStyle='pill' disabled={!domain || !selectedTenantID} size='small' el='link' to={`${getClientSideURL()}/${domain}`} newTab>Preview Portfolio</Button>
}