import { TLinkBadge } from "@/payload-types";
import { BlockProps } from "@/types";
import { getLinkInfo } from "@/utilities/getLinkInfo";
import { getServerSideURL } from "@/utilities/getURL";
import Link from "next/link";

export async function LinkBadge(props: { blockProps: TLinkBadge } & Omit<BlockProps<'linkBadge'>, 'blockProps'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const { url , label } = blockProps || {}

    const info = await getLinkInfo(url ?? getServerSideURL())
    return (
        <span className="inline-flex items-center border py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full px-1 text-foreground">
            <Link href={url as string} target="_blank" className="flex items-center gap-1">
                <img
                    alt=""
                    className="rounded-full size-4"
                    src={info.favicon as string}
                />
                {label}
            </Link>
        </span>

    )
}