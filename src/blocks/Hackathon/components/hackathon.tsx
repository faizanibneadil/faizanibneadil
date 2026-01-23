import { RichText } from '@payloadcms/richtext-lexical/react';
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

const BLUR_FADE_DELAY = 0.04;
export async function Hackathon(props: BlockProps<'hackathon'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        description,
        hackathons,
        id
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="hackathons" aria-label={blockName ?? blockType}>
            <div className="space-y-12 w-full py-12">
                <BlurFade delay={BLUR_FADE_DELAY * 13}>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                Hackathons
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                {heading}
                            </h2>
                            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                <RichText data={description as SerializedEditorState} />
                            </p>
                        </div>
                    </div>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 14}>
                    <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                        {hackathons?.map((hackathon, id) => {
                            return typeof hackathon === 'number' ? null : (
                                <BlurFade
                                    key={hackathon.id}
                                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                                >
                                    <HackathonCard {...hackathon} />
                                </BlurFade>
                            )
                        })}
                    </ul>
                </BlurFade>
            </div>
        </section>
    )
}