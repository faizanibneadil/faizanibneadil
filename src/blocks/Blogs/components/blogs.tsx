import { RichText } from '@payloadcms/richtext-lexical/react'
import BlurFade from "@/components/magicui/blur-fade";
import { IAchievementProps, IBlogsBlockProps } from "@/payload-types";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { HackathonCard } from "@/components/hackathon-card";
import { PagePropsWithParams } from "@/types";

const BLUR_FADE_DELAY = 0.04;
export async function BlogsBlock(props: { blockProps: IBlogsBlockProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps: {
            blogs,
            heading,
            description,
            blockType,
            blockName
        },
        params: paramsFromProps
    } = props || {}
    const params = await paramsFromProps
    return (
        <section id="researches" aria-label={blockName ?? blockType}>
            <div className="space-y-12 w-full py-12">
                <BlurFade delay={BLUR_FADE_DELAY * 13}>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                Blogs
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                {heading}
                            </h2>
                            {/* <p className=""> */}
                                <RichText className='text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed' data={description as SerializedEditorState} />
                            {/* </p> */}
                        </div>
                    </div>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 14}>
                    <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                        {blogs?.map((blog, id) => {
                            return typeof blog === 'number' ? null : (
                                <BlurFade
                                    key={blog.id}
                                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                                >
                                    {blog.title}
                                </BlurFade>
                            )
                        })}
                    </ul>
                </BlurFade>
            </div>
        </section>
    )
}