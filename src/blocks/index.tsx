import { Fragment, Suspense } from "react";
import dynamic from "next/dynamic";
import type { Page } from "@/payload-types";
import type { PagePropsWithParams } from "@/types";
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
    [K in BlockSlug]?: {
        skeleton: React.ComponentType<{}>,
        component: React.ComponentType<{
            params: PagePropsWithParams['params'],
            blockProps: Extract<NonNullable<Page['content']['layout']>[number], { blockType: K }>
            searchParams: PagePropsWithParams['searchParams']
        }>
    }
}

const _blocks: TBlocks = {
    hero: {
        skeleton: dynamic(() => import("@/blocks/Hero/components/hero-skeleton").then(({ HeroSkeleton }) => ({
            default: HeroSkeleton
        }))),
        component: dynamic(() => import("@/blocks/Hero/components/hero").then(({ Hero }) => ({
            default: Hero
        })))
    },
    contact: {
        component: dynamic(() => import("@/blocks/Contact/components/contact").then(({ Contact }) => ({
            default: Contact
        }))),
        skeleton: () => <div>Loading details ...</div>
    },
    education: {
        component: dynamic(() => import("@/blocks/Education/components/educations").then(({ Education }) => ({
            default: Education
        }))),
        skeleton: dynamic(() => import("@/blocks/Education/components/educations-skeleton").then(({ EducationSkeleton }) => ({
            default: EducationSkeleton
        })))
    },
    skill: {
        component: dynamic(() => import("@/blocks/Skill/components/skills").then(({ Skill }) => ({
            default: Skill
        }))),
        skeleton: () => <div>Loading skills details ...</div>
    },
    experience: {
        component: dynamic(() => import("@/blocks/Experiences/components/experiences").then(({ Experience }) => ({
            default: Experience
        }))),
        skeleton: dynamic(() => import("@/blocks/Experiences/components/experiences-skeleton").then(({ ExperienceSkeleton }) => ({
            default: ExperienceSkeleton
        })))
    },
    about: {
        component: dynamic(() => import("@/blocks/About/components/about").then(({ About }) => ({
            default: About
        }))),
        skeleton: () => <div>Loading about details ...</div>
    },
    hackathon: {
        component: dynamic(() => import("@/blocks/Hackathon/components/hackathon").then(({ Hackathon }) => ({
            default: Hackathon
        }))),
        skeleton: () => <div>Loading hackathon details ...</div>
    },
    project: {
        component: dynamic(() => import("@/blocks/Project/components/project").then(({ Project }) => ({
            default: Project
        }))),
        skeleton: () => <div>Loading projects Details ...</div>
    },
    research: {
        component: dynamic(() => import("@/blocks/Research/components/research").then(({ Research }) => ({
            default: Research
        }))),
        skeleton: () => <div>Loading researches details ...</div>
    },
    publication: {
        component: dynamic(() => import("@/blocks/Publication/components/publication").then(({ Publication }) => ({
            default: Publication
        }))),
        skeleton: () => <div>Loading publications details ...</div>
    },
    license: {
        component: dynamic(() => import("@/blocks/Licenses/components/license").then(({ License }) => ({
            default: License
        }))),
        skeleton: () => <div>Loading license details ....</div>
    },
    certification: {
        component: dynamic(() => import("@/blocks/Certification/components/certification").then(({ Certification }) => ({
            default: Certification
        }))),
        skeleton: () => <div>Loading certifications details ...</div>
    },
    achievement: {
        component: dynamic(() => import("@/blocks/Achievement/components/achievement").then(({ Achievement }) => ({
            default: Achievement
        }))),
        skeleton: () => <div>Loading achievement details ...</div>
    },
    "github-contributions": {
        component: dynamic(() => import("@/blocks/GithubContribution/components/github-contributions").then(({ GitHubContributionBlock }) => ({
            default: GitHubContributionBlock
        }))),
        skeleton: dynamic(() => import("@/blocks/GithubContribution/components/github-contributions-skeleton").then(({ GithubContributionsSkeleton }) => ({
            default: GithubContributionsSkeleton
        })))
    },
    "blogs-block": {
        component: dynamic(() => import("@/blocks/Blogs/components/blogs").then(({ BlogsBlock }) => ({
            default: BlogsBlock
        }))),
        skeleton: () => <div>Loading blogs details ...</div>
    },
    formBlock: {
        component: dynamic(() => import("@/blocks/Form/components/form-block").then(({ FormBlock }) => ({
            default: FormBlock
        }))),
        skeleton: () => <div>Loading form details ...</div>
    },
    "code-block": {
        component: dynamic(() => import("@/blocks/Code/components/CodeBlock").then(({ CodeBlock }) => ({
            default: CodeBlock
        }))),
        skeleton: () => <div>Loading code details ...</div>
    },
}

export async function BlocksRenderer(props: { blocks: Page['content']['layout'][][0], params: PagePropsWithParams['params'], searchParams: PagePropsWithParams['searchParams'] }) {
    const { blocks = [], params, searchParams } = props || {}

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
                                    <Suspense fallback={<Skeleton />}>
                                        {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                        <Block blockProps={block} params={params} searchParams={searchParams} />
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