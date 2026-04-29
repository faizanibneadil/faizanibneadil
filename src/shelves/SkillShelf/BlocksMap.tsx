import { BlocksMapType } from "@/types";
import dynamic from "next/dynamic";

export const __SkillshelfBlocksMap: BlocksMapType = {
    "columns-block": {
        component: () => null,
        skeleton: () => null
    },
    profile: {
        skeleton: dynamic(() => import("@/shelves/SkillShelf/blocks/Profile/profile-skeleton").then(({ ProfileSkeleton }) => ({
            default: ProfileSkeleton
        }))),
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Profile/profile").then(({ Profile }) => ({
            default: Profile
        })))
    },
    contact: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Contact/contact").then(({ Contact }) => ({
            default: Contact
        }))),
        skeleton: dynamic(() => import('@/shelves/SkillShelf/blocks/Contact/contact-skeleton').then(({ ContactSkeleton }) => ({
            default: ContactSkeleton
        })))
    },
    education: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Education/educations").then(({ Education }) => ({
            default: Education
        }))),
        skeleton: dynamic(() => import("@/shelves/SkillShelf/blocks/Education/educations-skeleton").then(({ EducationSkeleton }) => ({
            default: EducationSkeleton
        })))
    },
    skill: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Skill/skills").then(({ Skill }) => ({
            default: Skill
        }))),
        skeleton: dynamic(() => import('@/shelves/SkillShelf/blocks/Skill/skill-skeleton').then(({ SkillSkeleton }) => ({
            default: SkillSkeleton
        })))
    },
    experience: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Experiences/experiences").then(({ Experience }) => ({
            default: Experience
        }))),
        skeleton: dynamic(() => import("@/shelves/SkillShelf/blocks/Experiences/experiences-skeleton").then(({ ExperienceSkeleton }) => ({
            default: ExperienceSkeleton
        })))
    },
    about: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/About/about").then(({ About }) => ({
            default: About
        }))),
        skeleton: () => <div>Loading about details ...</div>
    },
    hackathon: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Hackathon/hackathon").then(({ Hackathon }) => ({
            default: Hackathon
        }))),
        skeleton: () => <div>Loading hackathon details ...</div>
    },
    project: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Project/project").then(({ Project }) => ({
            default: Project
        }))),
        skeleton: dynamic(() => import('@/shelves/SkillShelf/blocks/Project/project-skeleton').then(({ ProjectSkeleton }) => ({
            default: ProjectSkeleton
        })))
    },
    research: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Research/research").then(({ Research }) => ({
            default: Research
        }))),
        skeleton: () => <div>Loading researches details ...</div>
    },
    publication: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Publication/publication").then(({ Publication }) => ({
            default: Publication
        }))),
        skeleton: () => <div>Loading publications details ...</div>
    },
    license: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Licenses/license").then(({ License }) => ({
            default: License
        }))),
        skeleton: () => <div>Loading license details ....</div>
    },
    certification: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Certification/certification").then(({ Certification }) => ({
            default: Certification
        }))),
        skeleton: () => <div>Loading certifications details ...</div>
    },
    achievement: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Achievement/achievement").then(({ Achievement }) => ({
            default: Achievement
        }))),
        skeleton: () => <div>Loading achievement details ...</div>
    },
    "github-contributions": {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/GithubContribution/github-contributions").then(({ GitHubContributionBlock }) => ({
            default: GitHubContributionBlock
        }))),
        skeleton: dynamic(() => import("@/shelves/SkillShelf/blocks/GithubContribution/github-contributions-skeleton").then(({ GithubContributionsSkeleton }) => ({
            default: GithubContributionsSkeleton
        })))
    },
    // "blogs-block": {
    //     component: dynamic(() => import("@/shelves/Magic/blocks/Blogs/blogs").then(({ BlogsBlock }) => ({
    //         default: BlogsBlock
    //     }))),
    //     skeleton: () => <div>Loading blogs details ...</div>
    // },
    formBlock: {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Form/form-block").then(({ FormBlock }) => ({
            default: FormBlock
        }))),
        skeleton: dynamic(() => import('@/shelves/SkillShelf/blocks/Form/form-block-skeleton').then(({ FormBlockSkeleton }) => ({
            default: FormBlockSkeleton
        })))
    },
    "code-block": {
        component: dynamic(() => import("@/shelves/SkillShelf/blocks/Code/CodeBlock").then(({ CodeBlock }) => ({
            default: CodeBlock
        }))),
        skeleton: () => <div>Loading code details ...</div>
    },
}