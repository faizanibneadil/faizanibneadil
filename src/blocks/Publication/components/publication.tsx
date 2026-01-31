import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { PublicationCard } from '@/components/publication-card';
import RichText from "@/components/RichText";

const BLUR_FADE_DELAY = 0.04;
export async function Publication(props: BlockProps<'publication'>) {
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
        id,
        publications
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="publications" aria-label={blockName ?? blockType}>
            <div className="space-y-12 w-full py-12">
                <BlurFade delay={BLUR_FADE_DELAY * 13}>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                Publications
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                {heading}
                            </h2>
                            {description && (
                                <div className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    <RichText data={description} params={params} searchParams={searchParams} />
                                </div>
                            )}
                        </div>
                    </div>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 14}>
                    <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                        {publications?.map((publication, id) => {
                            return typeof publication === 'number' ? null : (
                                <BlurFade
                                    key={publication.id}
                                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                                >
                                    <PublicationCard publication={publication} params={params} searchParams={searchParams} />
                                </BlurFade>
                            )
                        })}
                    </ul>
                </BlurFade>
            </div>
        </section>
    )
}