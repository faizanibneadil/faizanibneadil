import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
// import config from '@payload-config'
import BlurFade from "@/components/magicui/blur-fade";
// import Markdown from "react-markdown";
import { IAboutProps } from '@/payload-types';
import { PagePropsWithParams } from '@/types';


const BLUR_FADE_DELAY = 0.04;


export async function About(props: { blockProps: IAboutProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps: {
            content,
            blockType,
            blockName
        },
        params: paramsFromProps
    } = props || {}
    const params = await paramsFromProps
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