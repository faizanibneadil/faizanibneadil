import {
    Glimpse,
    GlimpseContent,
    GlimpseDescription,
    GlimpseImage,
    GlimpseTitle,
    GlimpseTrigger,
} from "@/components/kibo-ui/glimpse";
import { TGlimpseLink } from "@/payload-types";
import { BlockProps } from "@/types";
import { getLinkInfo } from "@/utilities/getLinkInfo";
import { getServerSideURL } from "@/utilities/getURL";


export async function GlimpseLink(props: { blockProps: TGlimpseLink } & Omit<BlockProps<'glimpseLink'>, 'blockProps'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props

    const { url, label } = blockProps || {}

    let info: Awaited<ReturnType<typeof getLinkInfo>> = {
        description: null,
        favicon: null,
        image: null,
        title: null
    }

    try {
        const linkInfo = await getLinkInfo(url ?? getServerSideURL())
        info.description = linkInfo.description
        info.favicon = linkInfo.favicon
        info.image = linkInfo.image
        info.title = linkInfo.title
    } catch (error) {
        console.error(error, 'from get link info of glimpse')
    }

    if (info?.title === null && info?.description === null && info?.image === null) {
        return (
            <a href={url ?? '#'}>
                {label}
            </a>
        )
    }

    return (
        <Glimpse closeDelay={0} openDelay={0}>
            <GlimpseTrigger asChild>
                <a href={url ?? '#'}>
                    {label}
                </a>
            </GlimpseTrigger>
            <GlimpseContent className="w-80 z-[9999]">
                <GlimpseImage src={info?.image ?? ""} />
                <GlimpseTitle>{info?.title}</GlimpseTitle>
                <GlimpseDescription>{info?.description}</GlimpseDescription>
            </GlimpseContent>
        </Glimpse>
    )
}