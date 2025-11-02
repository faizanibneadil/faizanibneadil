import { IconRenderer } from "@/components/ui/icon-renderer"
import { getIconById } from "@/utilities/getIconById"
import { DefaultCellComponentProps } from "payload"

export function ViewIcon(props: DefaultCellComponentProps) {
    const { cellData } = props
    const icon = getIconById({ id: cellData as number })
    return <IconRenderer icon={icon} className="" />
}