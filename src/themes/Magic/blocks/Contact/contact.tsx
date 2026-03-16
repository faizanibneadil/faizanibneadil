import BlurFade from "@/components/magicui/blur-fade";
import type { IContactProps } from "@/payload-types";
// import Link from "next/link";
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { BlockProps } from "@/types";
import { FormBlock } from "@/blocks/Form/components/form-block";


const BLUR_FADE_DELAY = 0.04;
export async function Contact(props: BlockProps<'contact'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        blockName,
        content,
        enableIntro,
        form: formFromProps,
        id,
        introContent
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="contact" aria-label={blockName ?? blockType}>
            <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
                <BlurFade delay={BLUR_FADE_DELAY * 16}>
                    <div className="space-y-3">
                        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                            Contact
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Get in Touch
                        </h2>
                        <div className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            <RichText data={content as SerializedEditorState} />
                        </div>
                        {/* <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Want to chat? Just shoot me a dm{" "}
                            <Link href="#" className="text-blue-500 hover:underline">
                                with a direct question on Whatsapp (+92) 3422342958
                            </Link>{" "}
                            and I&apos;ll respond whenever I can. I will ignore all
                            soliciting.
                        </p> */}
                    </div>
                </BlurFade>
                <FormBlock
                    searchParams={searchParamsFromProps}
                    params={paramsFromProps}
                    blockProps={{
                        blockType: 'formBlock',
                        form: formFromProps as NonNullable<IContactProps['form']>,
                        enableIntro,
                        introContent
                    }}
                />
            </div>
        </section>
    )
}