import { DefaultCellComponentProps } from "payload"

export function ViewIcon(props: DefaultCellComponentProps) {
    const { cellData, } = props
    return <div dangerouslySetInnerHTML={{ __html: cellData as string }} />
}