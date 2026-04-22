import { PayloadRequest, CollectionSlug } from 'payload'

type Props = {
    collectionSlug: CollectionSlug
    slug: string
    req: PayloadRequest,
    portfolioSlug: string | number
}

export const generatePreviewPath = ({ collectionSlug, slug, portfolioSlug  }: Props) => {
    // Allow empty strings, e.g. for the homepage
    if (slug === undefined || slug === null) {
        return null
    }

    const encodedParams = new URLSearchParams({
        slug,
        collection: collectionSlug,
        // path: `${collectionPrefixMap[collection]}/${slug}`,
        path: `/${portfolioSlug}/${collectionSlug}/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || '',
    })
    const url = `/next/preview?${encodedParams.toString()}`

    return url
}