import type { PageProps } from "@/types"
import BlurFade from '@/components/magicui/blur-fade';
import { BlockProps } from '@/types';
import { SkillShelfRichText } from './RichText';

const BLUR_FADE_DELAY = 0.04;
export function SectionPresentationCard(props: Pick<BlockProps<'skill'>['blockProps'], 'heading' | 'description'> & {
     label: String, 
     params: Awaited<PageProps['params']>, searchParams: Awaited<PageProps['searchParams']> }) {
    const {
        description,
        heading,
        label,
        params,
        searchParams
    } = props || {}
    return (
        <div className="group relative overflow-hidden rounded-lg p-[1px]">
            <div
                className="absolute inset-0 z-0 animate-spin"
                style={{
                    animationDuration: '4s',
                    background: `conic-gradient(from 0deg, transparent 20%, #3b82f6 40%, #ef4444 70%, #2dd4bf 90%, transparent 100%)`,
                    margin: "-100%",
                }}
            />

            <div className="relative z-10 h-full w-full rounded-[inherit] bg-background">
                <BlurFade delay={BLUR_FADE_DELAY * 11}>
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <div className="space-y-2 px-4"> {/* Side padding added for safety */}
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                {label}
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                {heading}
                            </h2>
                            {/* <div className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                <RichText data={description as SerializedEditorState} />
                            </div> */}
                            <SkillShelfRichText data={description} params={params} searchParams={searchParams} />
                        </div>
                    </div>
                </BlurFade>
            </div>
        </div>
    )
}