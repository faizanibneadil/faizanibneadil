import config from '@payload-config'
import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";
import { IAboutProps } from '@/payload-types';

const BLUR_FADE_DELAY = 0.04;


export async function About(props: IAboutProps) {
    const { content } = props || {}
    return (
        <section id="about">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                   content
                </Markdown>
            </BlurFade>
        </section>
    )
}