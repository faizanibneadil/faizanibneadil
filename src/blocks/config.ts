import { Hero } from '@/blocks/Hero'
import { Contact } from '@/blocks/Contact'
import { Education } from '@/blocks/Education'
import { Project } from '@/blocks/Project'
import { Skill } from '@/blocks/Skill'
import { Experience } from '@/blocks/Experiences'
import { About } from '@/blocks/About'
import { Hackathon } from '@/blocks/Hackathon'
import { Research } from '@/blocks/Research'
import { Publication } from '@/blocks/Publication'
import { License } from '@/blocks/Licenses'
import { Certification } from '@/blocks/Certification'
import { Achievement } from '@/blocks/Achievement'
import { GitHubContributionsBlock } from '@/blocks/GithubContribution'
import type { Block, BlockSlug } from 'payload'
import { BlogsBlock } from '@/blocks/Blogs'
import { FormBlock } from '@/blocks/Form'
import { Newsletter } from '@/blocks/Newsletter'


export const blocks: Block[] = [
    Hero,
    Contact,
    Education,
    Project,
    Skill,
    Experience,
    About,
    Hackathon,
    Research,
    Publication,
    License,
    Certification,
    Achievement,
    GitHubContributionsBlock,
    BlogsBlock,
    FormBlock,
    Newsletter
]

export const defaultBlocks: BlockSlug[] = [
    'about',
    'contact',
    'hero',
    'skill',
    'education',
    'experience',
    'blogs-block',
    'formBlock',
    'newsletter'
]
export const itSpecificBlock: BlockSlug[] = [
    "achievement",
    "certification",
    "github-contributions",
    "hackathon",
    "project",
    "publication",
    "research",
]
export const pharmaSpecificBlocks: BlockSlug[] = [
    'certification',
    'license',
    'research'
]