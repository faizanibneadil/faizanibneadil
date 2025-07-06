import config from '@payload-config'
import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";
import { IAboutProps } from '@/payload-types';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'


const BLUR_FADE_DELAY = 0.04;


export async function About(props: IAboutProps) {
    const { content, blockType, blockName } = props || {}
    return (
        <section id="about" aria-label={blockName ?? blockType}>
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert" dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({ data: content as SerializedEditorState }) }} />
            </BlurFade>
        </section>
    )
}