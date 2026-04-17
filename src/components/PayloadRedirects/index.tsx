import type React from 'react'
import type { Page, } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
    disableNotFound?: boolean
    url: string,
    domain: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({
    disableNotFound,
    url: urlFromProps,
    domain: domainFromProps
}) => {
    const redirects = await getCachedRedirects()()

    const redirectItem = redirects.find((redirect) => redirect.from === urlFromProps)

    if (redirectItem) {
        if (redirectItem.to?.url) {
            redirect(redirectItem.to.url)
        }

        let url: string = ''

        if (typeof redirectItem?.to?.reference?.value === 'number') {
            try {
                const collectionSlug = redirectItem?.to?.reference?.relationTo
                const slug = redirectItem?.to?.reference?.value as unknown as string
                const document = (await getCachedDocument(domainFromProps, collectionSlug, slug)()) as Page
                url = `/${redirectItem?.tenant?.slug}/${redirectItem?.to?.reference?.relationTo}/${document?.slug}`
            } catch (error) {
                console.error('Something went wrong to fetch redirect document.')
            }
        }

        if (typeof redirectItem?.to?.reference?.value === 'object') {
            url = `/${redirectItem?.tenant?.slug}/${redirectItem?.to?.reference?.relationTo}/${redirectItem?.to?.reference?.value?.slug}`
        }

        if (url) {
            redirect(url)
        }
    }

    if (disableNotFound) {
        return null
    }

    // notFound()

    return null
}