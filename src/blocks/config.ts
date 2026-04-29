import { Profile } from '@/blocks/Profile'
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
import { Code } from '@/blocks/Code'
import { ColumnsBlock } from './Columns'


export const blocks: Block[] = [
    Profile,
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
    Code,
    ColumnsBlock
]