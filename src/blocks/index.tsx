import { Fragment, Suspense } from "react";
import type { BlocksRegistryProps } from "@/types";
import { BlocksRegistries } from "@/registries";

export async function BlocksRenderer(props: BlocksRegistryProps) {
    const {
        blocks = [],
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

    if (hasBlocks) {
        return (
            <Fragment>
                <section id="contact" className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 bg-secondary/80 py-2 dark:bg-secondary/40 -mt-10">
                    {/* <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" /> */}
                    <a href='https://skillshelf.vercel.app' className="text-xs">Powered by skillshelf.vercel.app</a>
                    <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
                </section>

                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (Object.hasOwn(BlocksRegistries, blockType)) {
                        const Block = BlocksRegistries[blockType]?.component
                        const Skeleton = BlocksRegistries[blockType]?.skeleton!

                        if (Block) {
                            return (
                                <div className="my-5 first:mt-0" key={`${blockType}-${index}`}>
                                    <Suspense fallback={<Skeleton />}>
                                        {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                        <Block blockProps={block} params={paramsFromProps} searchParams={searchParamsFromProps} />
                                    </Suspense>
                                </div>
                            )
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }
    return 'Nothing for render ...'
}