import dynamic from "next/dynamic";
import type { Page } from "@/payload-types";
import type { PageProps } from "@/types";
import type { BlockSlug } from "payload";

export type TBlocks = {
    [K in BlockSlug]?: {
        skeleton: React.ComponentType<{}>,
        component: React.ComponentType<{
            blockProps: Extract<NonNullable<Page['content']['layout']>[number], { blockType: K }>,
        } & PageProps>
    }
}

export const BlocksRegistries: TBlocks = {
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
        skeleton: dynamic(() => import('@/blocks/Project/components/project-skeleton').then(({ProjectSkeleton}) =>({
            default: ProjectSkeleton
        })))
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