import { Page } from "@/payload-types";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { Hero } from "./Hero/components/hero";
import { About } from "./About/components/about";

const _blocks = {
    hero: Hero,
    blog: () => <div>Blog</div>,
    contact: () => <div>contact</div>,
    education: () => <div>edu</div>,
    skills: () => <div>skillll</div>,
    experiances: () => <div>exp</div>,
    about: About
}

export function BlocksRenderrer(props: { blocks: Page['layout'][][0] }) {
    const { blocks = [] } = props || {}

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (blockType && blockType in _blocks) {
                        const Block = _blocks[blockType]

                        if (Block) {
                            return (
                                <div className="my-16" key={`${blockType}-${index}`}>
                                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                    <Block {...block} />
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