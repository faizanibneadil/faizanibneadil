import { BlocksRegistries } from "@/registries"

export default function PageSkeleton() {
    const HeroSkeleton = BlocksRegistries.hero?.skeleton
    const AboutSkeleton = BlocksRegistries.about?.skeleton
    const GithubContributionsSkeleton = BlocksRegistries["github-contributions"]?.skeleton
    const ExperienceSkeleton = BlocksRegistries.experience?.skeleton
    const ProjectSkeleton = BlocksRegistries.project?.skeleton
    const SkillsSkeleton = BlocksRegistries.skill?.skeleton
    const ContactSkeleton = BlocksRegistries.contact?.skeleton
    return (
      <div className="my-5 first:mt-0">
        {HeroSkeleton && <HeroSkeleton />}
        {AboutSkeleton && <AboutSkeleton />}
        {GithubContributionsSkeleton && <GithubContributionsSkeleton />}
        {ExperienceSkeleton && <ExperienceSkeleton />}
        {ProjectSkeleton && <ProjectSkeleton />}
        {SkillsSkeleton && <SkillsSkeleton />}
        {ContactSkeleton && <ContactSkeleton />}
      </div>
    )
  }