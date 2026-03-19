import type { Page } from "@/payload-types"

export function isLayout(mode: any) {
    return mode === 'layout'
}
export function isCollection(mode: any) {
    return mode === 'collection'
}