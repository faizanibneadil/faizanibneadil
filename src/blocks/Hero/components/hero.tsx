import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { IHeroProps } from "@/payload-types";
import { getClientSideURL } from "@/utilities/getURL";

const BLUR_FADE_DELAY = 0.04;

export function Hero(props: IHeroProps) {
    const { nameOnResume, profile } = props || {}

    return (
        <section id="hero">
            <div className="mx-auto w-full max-w-2xl space-y-8">
                <div className="gap-2 flex justify-between">
                    <div className="flex-col flex flex-1 space-y-1.5">
                        <BlurFadeText
                            delay={BLUR_FADE_DELAY}
                            className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                            yOffset={8}
                            text={`${nameOnResume} 👋`}
                        />
                        <BlurFadeText
                            className="max-w-[600px] md:text-xl"
                            delay={BLUR_FADE_DELAY}
                            text={DATA.description}
                        />
                    </div>
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <Avatar className="size-28 border">
                            <AvatarImage
                                alt={nameOnResume as string}
                                src={profile && typeof profile === 'object' && profile?.url ? `${getClientSideURL()}/${profile?.url}` : ''}
                                className="object-cover object-top aspect-auto"
                            />
                            <AvatarFallback>{DATA.initials}</AvatarFallback>
                        </Avatar>
                    </BlurFade>
                </div>
            </div>
        </section>
    )
}