import { Icon } from '@iconify/react'
import { DefaultCellComponentProps } from "payload"

export function ViewIcon(props: DefaultCellComponentProps) {
    const { rowData } = props

    return (
            <Icon
                width='100%' height='4em'
                className='p-4'
                icon={rowData.title}
            />
    )
}