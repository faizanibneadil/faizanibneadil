import { FormBlock } from "@/blocks/Form/components/form-block";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { TNewsletterBlockProps } from "@/payload-types";
import type { PagePropsWithParams } from "@/types";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { ArrowRightIcon, AtSignIcon } from "lucide-react";

export async function Newsletter(props: { blockProps: TNewsletterBlockProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps: {
            blockType,
            heading,
            blockName,
            description,
            id,
            form: formFromProps
        },
        params: paramsFromProps
    } = props || {}
    const params = await paramsFromProps
    return (
        <section aria-label={blockName ?? blockType} className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-8 md:px-4 dark:bg-secondary/40">
            <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

            <div className="space-y-1">
                <h2 className="text-center font-semibold text-2xl tracking-tight md:text-4xl">
                    {heading}
                </h2>
                <RichText className="text-balance text-center text-muted-foreground text-sm md:text-base" data={description as DefaultTypedEditorState} params={params} />
            </div>
            <FormBlock params={paramsFromProps}
                blockProps={{
                    blockType: 'formBlock',
                    form: formFromProps as NonNullable<TNewsletterBlockProps['form']>,
                    enableIntro: false,
                    introContent: null
                }} />
            {/* <div className="flex items-center justify-center gap-2">
				<InputGroup className="max-w-[280px] bg-card">
					<InputGroupInput placeholder="Enter your email" />
					<InputGroupAddon>
						<AtSignIcon />
					</InputGroupAddon>
				</InputGroup>

				<Button>
					{subscribeButtonText} <ArrowRightIcon />
				</Button>
			</div> */}
            {/* <div className="flex items-center justify-center gap-2">
				<p className="text-muted-foreground text-sm">
					Written by{" "}
					<span className="font-medium text-foreground">real humans</span> (we
					swear).
				</p>
				<div className="-space-x-[0.45rem] flex">
					<img
						alt="Avatar 01"
						className="rounded-full ring-1 ring-background"
						height={24}
						src="https://mynaui.com/avatars/avatar-01.jpg"
						width={24}
					/>
					<img
						alt="Avatar 02"
						className="rounded-full ring-1 ring-background"
						height={24}
						src="https://mynaui.com/avatars/avatar-02.jpg"
						width={24}
					/>
					<img
						alt="Avatar 03"
						className="rounded-full ring-1 ring-background"
						height={24}
						src="https://mynaui.com/avatars/avatar-03.jpg"
						width={24}
					/>
					<img
						alt="Avatar 04"
						className="rounded-full ring-1 ring-background"
						height={24}
						src="https://mynaui.com/avatars/avatar-04.jpg"
						width={24}
					/>
				</div>
			</div> */}

            <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
        </section>
    )
}