import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import { Page } from "@/payload-types";
import { PagePropsWithParams } from "@/types";
import type { BlockSlug } from "payload";

// type PageLayout = NonNullable<Page['layout']>
// type TBlocksSlugs = PageLayout extends (infer U)[]
//     ? U extends { blockType: infer T } ? T : never
//     : never

// type TBlocks = {
//     [K in TBlocksSlugs]?: React.ComponentType<{
//         blockProps: Extract<PageLayout[number], { blockType: K }>,
//         params: PagePropsWithParams["params"];
//     }>
//}

type TBlocks = {
    [K in BlockSlug]?: React.ComponentType<{
        params: PagePropsWithParams['params'],
        blockProps: Extract<NonNullable<Page['layout']>[number], { blockType: K }>
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
    experience: dynamic(() => import("@/blocks/Experiences/components/experiences").then(({ Experience }) => {
        return Experience
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
    })),
    "github-contributions": dynamic(() => import("@/blocks/GithubContribution/components/github-contributions").then(({ GitHubContributionBlock }) => {
        return GitHubContributionBlock
    })),
    "blogs-block": dynamic(() => import("@/blocks/Blogs/components/blogs").then(({ BlogsBlock }) => {
        return BlogsBlock
    })),
    formBlock: dynamic(() => import("@/blocks/Form/components/form-block").then(({ FormBlock }) => {
        return FormBlock
    })),
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
                                <div className="my-5" key={`${blockType}-${index}`}>
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