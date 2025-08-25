export function isSameProps(prevProps: any, newProps: any) {
    return JSON.stringify(prevProps) === JSON.stringify(newProps)
}