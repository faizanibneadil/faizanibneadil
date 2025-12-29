import { Icon } from '@iconify/react'

export async function IconRenderer(props: { icon: string, width?: string | number, height?: string | number }) {
    const { 
        icon: iconFromProps, 
        height,
        width 
    } = props || {}

    return <Icon icon={iconFromProps} width={width} height={height} />
}


