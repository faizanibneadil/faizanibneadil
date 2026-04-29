import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import type { BlockProps } from "@/types";
import { getMediaUrl } from "@/utilities/getURL";

const BLUR_FADE_DELAY = 0.04;

export async function Profile(props: BlockProps<'profile'>) {
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
        <section id="profile" aria-label={blockName ?? blockType} className="rounded-lg bg-border shadow">
            <div className="mx-auto w-full max-w-2xl">
                <div className="flex items-center justify-center rounded-lg border bg-background p-4">
                    <div className="flex-col flex flex-1 space-y-1.5">
                        <BlurFadeText
                            delay={BLUR_FADE_DELAY}
                            className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                            yOffset={8}
                            text={nameOnResume ?? ''}
                        />
                        <BlurFadeText
                            className="max-w-[600px] md:text-xl"
                            delay={BLUR_FADE_DELAY}
                            text={headline as string}
                        />
                    </div>
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <Avatar className="size-28 border rounded-lg">
                            <AvatarImage
                                alt={nameOnResume as string}
                                src={getMediaUrl(profile)}
                                className="object-cover object-top aspect-auto rounded-lg"
                                fetchPriority="high"
                                loading="lazy"
                            />
                            <AvatarFallback className="rounded-lg">{DATA.initials}</AvatarFallback>
                        </Avatar>
                    </BlurFade>
                </div>
            </div>
        </section>
    )
}