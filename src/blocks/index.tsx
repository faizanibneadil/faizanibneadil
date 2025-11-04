import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import { Page } from "@/payload-types";
import { PagePropsWithParams } from "@/types";

type PageLayout = NonNullable<Page['layout']>
type TBlocksSlugs = PageLayout extends (infer U)[]
    ? U extends { blockType: infer T } ? T : never
    : never

type TBlocks = {
    [K in TBlocksSlugs]?: React.ComponentType<{
        blockProps: Extract<PageLayout[number], { blockType: K }>,
        params: PagePropsWithParams["params"];
    }>
}

const _blocks: TBlocks = {
    hero: dynamic(() => import("@/blocks/Hero/components/hero").then(({ Hero }) => {
        return Hero
    })),
    contact: dynamic(() => import("@/blocks/Contact/components/contact").then(({ Contact }) => {
        return Contact
    })),
    education: dynamic(() => import("@/blocks/Education/components/educations").then(({ Education }) => {
        return Education
    })),
    skill: dynamic(() => import("@/blocks/Skill/components/skills").then(({ Skill }) => {
        return Skill
    })),
    experiance: dynamic(() => import("@/blocks/Experiances/components/experiances").then(({ Experiance }) => {
        return Experiance
    })),
    about: dynamic(() => import("@/blocks/About/components/about").then(({ About }) => {
        return About
    })),
    hackathon: dynamic(() => import("@/blocks/Hackathon/components/hackathon").then(({ Hackathon }) => {
        return Hackathon
    })),
    project: dynamic(() => import("@/blocks/Project/components/project").then(({ Project }) => {
        return Project
    })),
    research: dynamic(() => import("@/blocks/Research/components/research").then(({ Research }) => {
        return Research
    })),
    publication: dynamic(() => import("@/blocks/Publication/components/publication").then(({ Publication }) => {
        return Publication
    })),
    license: dynamic(() => import("@/blocks/Licenses/components/license").then(({ License }) => {
        return License
    })),
    certification: dynamic(() => import("@/blocks/Certification/components/certification").then(({ Certification }) => {
        return Certification
    })),
    achievement: dynamic(() => import("@/blocks/Achievement/components/achievement").then(({ Achievement }) => {
        return Achievement
    }))
}

export function BlocksRenderer(props: { blocks: Page['layout'][][0], params: PagePropsWithParams['params'] }) {
    const { blocks = [], params } = props || {}

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
                                    <React.Suspense fallback='Loading...'>
                                        {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                        <Block blockProps={block} params={params} />
                                    </React.Suspense>
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