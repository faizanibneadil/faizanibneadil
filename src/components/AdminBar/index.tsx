'use client'

import type { PayloadAdminBarProps } from '@payloadcms/admin-bar'
import { useRouter } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const collectionLabels = {
    pages: {
        plural: 'Pages',
        singular: 'Page',
    },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
    adminBarProps?: PayloadAdminBarProps
}> = (props) => {
    const { adminBarProps } = props || {}
    const [show, setShow] = useState(false)
    const collection = 'pages'
    const router = useRouter()

    const onAuthChange = React.useCallback((user: any) => {
        setShow(user?.id)
    }, [])

    if(!adminBarProps?.preview){
        return null
    }

    return (
        <div className={cn('z-10 w-full bg-foreground/7.5 border-b-2 py-2 transition-opacity duration-150', {
            'block visible opacity-100': show === true,
            'hidden invisible opacity-0': show === false
        })}>
            <div className="px-4">
                <PayloadAdminBar
                    {...adminBarProps}
                    className="text-foreground"
                    classNames={{
                        controls: '[&>*:not(:last-child)]:mr-2',
                        logo: 'mr-2',
                        user: 'mr-2',
                    }}
                    cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
                    collectionSlug={collection}
                    collectionLabels={{
                        plural: collectionLabels[collection]?.plural || 'Pages',
                        singular: collectionLabels[collection]?.singular || 'Page',
                    }}
                    logo={<Title />}
                    onAuthChange={onAuthChange}
                    onPreviewExit={() => {
                        fetch('/exit-preview')
                            .then(() => {
                                router.push('/')
                                router.refresh()
                            })
                            .catch((error) => {
                                console.error('Error exiting preview:', error)
                            })
                    }}
                    style={{
                        backgroundColor: 'transparent',
                        padding: 0,
                        position: 'relative',
                        zIndex: 'unset',
                    }}
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-background" />
            </div>
        </div>
    )
}