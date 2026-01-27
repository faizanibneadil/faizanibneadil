import type { Page } from "@/payload-types"

export function isLayout(mode: Page['content']['pageMode']['mode']) {
    return mode === 'layout'
}
export function isCollection(mode: Page['content']['pageMode']['mode']) {
    return mode === 'collection'
}