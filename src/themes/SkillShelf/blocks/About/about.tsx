import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from '@/types';


const BLUR_FADE_DELAY = 0.04;
export async function About(props: BlockProps<'about'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        blockName,
        content,
        id
    } = blockProps || {}

    return (
        <section id="about" aria-label={blockName ?? blockType} className="rounded-lg bg-border shadow">
            <div className='rounded-lg border bg-background p-4' data-type='block'>
                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                    <h2 className="text-xl font-bold">About</h2>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 4}>
                    <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert" dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({ data: content as SerializedEditorState }) }} />
                </BlurFade>
            </div>
        </section>
    )
}