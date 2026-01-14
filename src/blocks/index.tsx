import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import { Page } from "@/payload-types";
import { PagePropsWithParams } from "@/types";
import type { BlockSlug } from "payload";
import { Badge } from "@/components/ui/badge";

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
    [K in BlockSlug]?: {
        skeleton: React.ComponentType<{}>,
        component: React.ComponentType<{
            params: PagePropsWithParams['params'],
            blockProps: Extract<NonNullable<Page['content']['layout']>[number], { blockType: K }>
        }>
    }
}

const _blocks: TBlocks = {
    hero: {
        skeleton: dynamic(() => import("@/blocks/Hero/components/hero-skeleton").then(({ HeroSkeleton }) => {
            return HeroSkeleton
        })),
        component: dynamic(() => import("@/blocks/Hero/components/hero").then(({ Hero }) => {
            return Hero
        }))
    },
    contact: {
        component: dynamic(() => import("@/blocks/Contact/components/contact").then(({ Contact }) => {
            return Contact
        })),
        skeleton: () => <div>Loading details ...</div>
    },
    education: {
        component: dynamic(() => import("@/blocks/Education/components/educations").then(({ Education }) => {
            return Education
        })),
        skeleton: dynamic(() => import("@/blocks/Education/components/educations-skeleton").then(({ EducationSkeleton }) => {
            return EducationSkeleton
        }))
    },
    skill: {
        component: dynamic(() => import("@/blocks/Skill/components/skills").then(({ Skill }) => {
            return Skill
        })),
        skeleton: () => <div>Loading skills details ...</div>
    },
    experience: {
        component: dynamic(() => import("@/blocks/Experiences/components/experiences").then(({ Experience }) => {
            return Experience
        })),
        skeleton: dynamic(() => import("@/blocks/Experiences/components/experiences-skeleton").then(({ ExperienceSkeleton }) => {
            return ExperienceSkeleton
        }))
    },
    about: {
        component: dynamic(() => import("@/blocks/About/components/about").then(({ About }) => {
            return About
        })),
        skeleton: () => <div>Loading about details ...</div>
    },
    hackathon: {
        component: dynamic(() => import("@/blocks/Hackathon/components/hackathon").then(({ Hackathon }) => {
            return Hackathon
        })),
        skeleton: () => <div>Loading hackathon details ...</div>
    },
    project: {
        component: dynamic(() => import("@/blocks/Project/components/project").then(({ Project }) => {
            return Project
        })),
        skeleton: () => <div>Loading projects Details ...</div>
    },
    research: {
        component: dynamic(() => import("@/blocks/Research/components/research").then(({ Research }) => {
            return Research
        })),
        skeleton: () => <div>Loading researches details ...</div>
    },
    publication: {
        component: dynamic(() => import("@/blocks/Publication/components/publication").then(({ Publication }) => {
            return Publication
        })),
        skeleton: () => <div>Loading publications details ...</div>
    },
    license: {
        component: dynamic(() => import("@/blocks/Licenses/components/license").then(({ License }) => {
            return License
        })),
        skeleton: () => <div>Loading license details ....</div>
    },
    certification: {
        component: dynamic(() => import("@/blocks/Certification/components/certification").then(({ Certification }) => {
            return Certification
        })),
        skeleton: () => <div>Loading certifications details ...</div>
    },
    achievement: {
        component: dynamic(() => import("@/blocks/Achievement/components/achievement").then(({ Achievement }) => {
            return Achievement
        })),
        skeleton: () => <div>Loading achievement details ...</div>
    },
    "github-contributions": {
        component: dynamic(() => import("@/blocks/GithubContribution/components/github-contributions").then(({ GitHubContributionBlock }) => {
            return GitHubContributionBlock
        })),
        skeleton: dynamic(() => import("@/blocks/GithubContribution/components/github-contributions-skeleton").then(({ GithubContributionsSkeleton }) => {
            return GithubContributionsSkeleton
        }))
    },
    "blogs-block": {
        component: dynamic(() => import("@/blocks/Blogs/components/blogs").then(({ BlogsBlock }) => {
            return BlogsBlock
        })),
        skeleton: () => <div>Loading blogs details ...</div>
    },
    formBlock: {
        component: dynamic(() => import("@/blocks/Form/components/form-block").then(({ FormBlock }) => {
            return FormBlock
        })),
        skeleton: () => <div>Loading form details ...</div>
    },
    "code-block": {
        component: dynamic(() => import("@/blocks/Code/components/CodeBlock").then(({ CodeBlock }) => {
            return CodeBlock
        })),
        skeleton: () => <div>Loading code details ...</div>
    },
}

export function BlocksRenderer(props: { blocks: Page['content']['layout'][][0], params: PagePropsWithParams['params'] }) {
    const { blocks = [], params } = props || {}

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

                    if (blockType && blockType in _blocks) {
                        const Block = _blocks[blockType]?.component
                        const Skeleton = _blocks[blockType]?.skeleton!

                        if (Block) {
                            return (
                                <div className="my-5 first:mt-0" key={`${blockType}-${index}`}>
                                    <React.Suspense fallback={<Skeleton />}>
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