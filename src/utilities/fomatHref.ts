import { TMenuItemsPropsType } from '@/payload-types'
export const formatHref = (args: {
    item: NonNullable<TMenuItemsPropsType>[number],
    domain: string
}): string => {
    const { domain, item } = args

    let url: NonNullable<TMenuItemsPropsType>[number]['url'] = ''

    if (item.type === 'external') {
        url = item.url
    }

    if (item?.type === 'internal' && typeof item?.page?.value === 'object') {
        if (item?.page?.value?.enableCollection) {
            url = `/${domain}/${item?.page?.value?.configuredCollectionSlug}`
        } else {
            url = `/${domain}/${item?.page?.relationTo}/${item?.page?.value?.slug}`
        }
    }


    return url ?? '/'
}