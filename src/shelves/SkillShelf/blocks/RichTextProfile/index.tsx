import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BlockProps } from "@/types";
import { getMediaUrl } from "@/utilities/getURL";
import { AvatarImage } from "@radix-ui/react-avatar";

export const RichTextProfile: React.FC<BlockProps<'profile'>> = (props) => {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        blockName,
        headline,
        id,
        nameOnResume,
        profile
    } = blockProps || {}

    return (
        <div className="w-full flex flex-col gap-2 items-center justify-center py-10">
            <Avatar className="size-28">
                <AvatarImage className="object-cover object-top aspect-auto rounded-lg"
                    fetchPriority="high"
                    loading="lazy" alt={nameOnResume ?? ''} src={getMediaUrl(profile)} />
                <AvatarFallback>{nameOnResume?.at(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{nameOnResume}</h1>
            <p className="max-w-[600px] md:text-xl">{headline}</p>
        </div>
    )
}