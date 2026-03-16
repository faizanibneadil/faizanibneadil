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
        skeleton: dynamic(() => import("@/themes/Magic/blocks/Hero/hero-skeleton").then(({ HeroSkeleton }) => ({
            default: HeroSkeleton
        }))),
        component: dynamic(() => import("@/themes/Magic/blocks/Hero/hero").then(({ Hero }) => ({
            default: Hero
        })))
    },
    contact: {
        component: dynamic(() => import("@/themes/Magic/blocks/Contact/contact").then(({ Contact }) => ({
            default: Contact
        }))),
        skeleton: dynamic(() => import('@/themes/Magic/blocks/Contact/contact-skeleton').then(({ ContactSkeleton }) => ({
            default: ContactSkeleton
        })))
    },
    education: {
        component: dynamic(() => import("@/themes/Magic/blocks/Education/educations").then(({ Education }) => ({
            default: Education
        }))),
        skeleton: dynamic(() => import("@/themes/Magic/blocks/Education/educations-skeleton").then(({ EducationSkeleton }) => ({
            default: EducationSkeleton
        })))
    },
    skill: {
        component: dynamic(() => import("@/themes/Magic/blocks/Skill/skills").then(({ Skill }) => ({
            default: Skill
        }))),
        skeleton: dynamic(() => import('@/themes/Magic/blocks/Skill/skill-skeleton').then(({ SkillSkeleton }) => ({
            default: SkillSkeleton
        })))
    },
    experience: {
        component: dynamic(() => import("@/themes/Magic/blocks/Experiences/experiences").then(({ Experience }) => ({
            default: Experience
        }))),
        skeleton: dynamic(() => import("@/themes/Magic/blocks/Experiences/experiences-skeleton").then(({ ExperienceSkeleton }) => ({
            default: ExperienceSkeleton
        })))
    },
    about: {
        component: dynamic(() => import("@/themes/Magic/blocks/About/about").then(({ About }) => ({
            default: About
        }))),
        skeleton: () => <div>Loading about details ...</div>
    },
    hackathon: {
        component: dynamic(() => import("@/themes/Magic/blocks/Hackathon/hackathon").then(({ Hackathon }) => ({
            default: Hackathon
        }))),
        skeleton: () => <div>Loading hackathon details ...</div>
    },
    project: {
        component: dynamic(() => import("@/themes/Magic/blocks/Project/project").then(({ Project }) => ({
            default: Project
        }))),
        skeleton: dynamic(() => import('@/themes/Magic/blocks/Project/project-skeleton').then(({ ProjectSkeleton }) => ({
            default: ProjectSkeleton
        })))
    },
    research: {
        component: dynamic(() => import("@/themes/Magic/blocks/Research/research").then(({ Research }) => ({
            default: Research
        }))),
        skeleton: () => <div>Loading researches details ...</div>
    },
    publication: {
        component: dynamic(() => import("@/themes/Magic/blocks/Publication/publication").then(({ Publication }) => ({
            default: Publication
        }))),
        skeleton: () => <div>Loading publications details ...</div>
    },
    license: {
        component: dynamic(() => import("@/themes/Magic/blocks/Licenses/license").then(({ License }) => ({
            default: License
        }))),
        skeleton: () => <div>Loading license details ....</div>
    },
    certification: {
        component: dynamic(() => import("@/themes/Magic/blocks/Certification/certification").then(({ Certification }) => ({
            default: Certification
        }))),
        skeleton: () => <div>Loading certifications details ...</div>
    },
    achievement: {
        component: dynamic(() => import("@/themes/Magic/blocks/Achievement/achievement").then(({ Achievement }) => ({
            default: Achievement
        }))),
        skeleton: () => <div>Loading achievement details ...</div>
    },
    "github-contributions": {
        component: dynamic(() => import("@/themes/Magic/blocks/GithubContribution/github-contributions").then(({ GitHubContributionBlock }) => ({
            default: GitHubContributionBlock
        }))),
        skeleton: dynamic(() => import("@/themes/Magic/blocks/GithubContribution/github-contributions-skeleton").then(({ GithubContributionsSkeleton }) => ({
            default: GithubContributionsSkeleton
        })))
    },
    "blogs-block": {
        component: dynamic(() => import("@/themes/Magic/blocks/Blogs/blogs").then(({ BlogsBlock }) => ({
            default: BlogsBlock
        }))),
        skeleton: () => <div>Loading blogs details ...</div>
    },
    formBlock: {
        component: dynamic(() => import("@/themes/Magic/blocks/Form/form-block").then(({ FormBlock }) => ({
            default: FormBlock
        }))),
        skeleton: dynamic(() => import('@/themes/Magic/blocks/Form/form-block-skeleton').then(({ FormBlockSkeleton }) => ({
            default: FormBlockSkeleton
        })))
    },
    "code-block": {
        component: dynamic(() => import("@/themes/Magic/blocks/Code/CodeBlock").then(({ CodeBlock }) => ({
            default: CodeBlock
        }))),
        skeleton: () => <div>Loading code details ...</div>
    },
}