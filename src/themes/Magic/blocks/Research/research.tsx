import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { ResearchCard } from '@/themes/Magic/blocks/Research/research-card';
import RichText from "@/components/RichText";
import { MagicRichText } from "../../components/RichText";

const BLUR_FADE_DELAY = 0.04;
export async function Research(props: BlockProps<'research'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        description,
        id,
        researches
    } = blockProps || {}

    return (
        <section id="researches" aria-label={blockName ?? blockType}>
            <div className="space-y-12 w-full py-12">
                <BlurFade delay={BLUR_FADE_DELAY * 13}>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                Researches
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                {heading}
                            </h2>
                            <MagicRichText className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data={description} params={params} searchParams={searchParams} />
                        </div>
                    </div>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 14}>
                    <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                        {researches?.map((research, id) => {
                            return typeof research === 'number' ? null : (
                                <BlurFade
                                    key={research.id}
                                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                                >
                                    <ResearchCard params={params} research={research} searchParams={searchParams} />
                                </BlurFade>
                            )
                        })}
                    </ul>
                </BlurFade>
            </div>
        </section>
    )
}