import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import Script from "next/script";

import { unstable_cache } from 'next/cache'


export const getTawkConfig = (domain: string) =>
    unstable_cache(
        async () => {
            try {
                const payload = await getPayloadConfig()
                const isNumericDomain = !Number.isNaN(Number(domain))
                const tawk = await payload.find({
                    collection: 'integration',
                    where: {
                        or: [
                            {
                                'tenant.slug': {
                                    equals: domain
                                }
                            },
                            ...(isNumericDomain
                                ? [{
                                    'tenant.id': {
                                        equals: Number(domain),
                                    },
                                }]
                                : []),
                        ]
                    }
                })

                return {
                    propertyId: tawk.docs?.at(0)?.tawkPropertyId,
                    widgetId: tawk?.docs?.at(0)?.tawkWidgetId,
                    enableChatButton: tawk?.docs?.at(0)?.enableChatButton,
                    enableTAWKBubble: tawk?.docs?.at(0)?.enableTawkBubble,
                }
            } catch (error) {
                console.error('Failed to fetch integration:', error)
                return {
                    propertyId: null,
                    widgetId: null,
                    enableChatButton: false,
                    enableTAWKBubble: false
                }
            }
        },
        [`tawk-integration-${domain}`],
        { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    )()

export async function TawkChatBubble(props: { domain: string }) {
    const {
        propertyId,
        widgetId,
        enableChatButton,
        enableTAWKBubble
    } = await getTawkConfig(props.domain)

    if (propertyId && widgetId && enableChatButton && enableTAWKBubble) {
        return (
            <Script
                strategy="afterInteractive"
                src="https://embed.tawk.to/694973b55dc095197c5b5a0f/1jd3envel"
            />
        )
    }

    return null
}