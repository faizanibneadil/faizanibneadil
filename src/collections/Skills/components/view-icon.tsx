import { IconRenderer } from "@/components/ui/icon-renderer"
import { DefaultCellComponentProps } from "payload"

export function ViewIcon(props: DefaultCellComponentProps) {
    const { cellData, } = props
    return <IconRenderer icon={cellData as number} className="" />
}