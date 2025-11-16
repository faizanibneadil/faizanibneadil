// import { IconRenderer } from "@/components/ui/icon-renderer"
import { getIconById } from "@/utilities/getIconById"
import { Icon } from "@iconify/react"
import { DefaultCellComponentProps } from "payload"

export async function ViewIcon(props: DefaultCellComponentProps) {
    const { cellData } = props
    const icon = await getIconById({ id: cellData as number })
    return <Icon icon={icon?.title} width='2em' height='2em' />
}