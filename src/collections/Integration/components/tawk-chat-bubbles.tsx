import { Integration } from "@/payload-types";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import Script from "next/script";

import { unstable_cache } from 'next/cache'


export const getTawkConfig = (domain: string) =>
    unstable_cache(
        async () => {
            try {
                const payload = await getPayloadConfig()
                const tawk = await payload.find({
                    collection: 'integration',
                    where: { 'tenant.slug': { equals: domain } }
                })

                return { propertyId: tawk.docs?.at(0)?.tawlPropertyId, widgetId: tawk?.docs?.at(0)?.tawkWidgetId }
            } catch (error) {
                console.error('Failed to fetch integration:', error)
                return { propertyId: null, widgetId: null }
            }
        },
        [`tawk-integration-${domain}`],
        { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    )()

export async function TawkChatBubble(props: { domain: string }) {
    const { propertyId, widgetId } = await getTawkConfig(props.domain)

    if (propertyId && widgetId) {
        return (
            <Script
                strategy="lazyOnload"
                src="https://embed.tawk.to/694973b55dc095197c5b5a0f/1jd3envel"
            />
        )
    }

    return null
}