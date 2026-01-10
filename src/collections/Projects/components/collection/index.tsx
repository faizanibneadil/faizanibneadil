import { BackButton } from "@/components/BackButton";
import BlurFade from "@/components/magicui/blur-fade"
import { ProjectCard } from "@/components/project-card"
import type { PagePropsWithParams } from "@/types";
import type { DataFromCollectionSlug, PaginatedDocs } from "payload"

type Props = { collection: PaginatedDocs<DataFromCollectionSlug<'projects'>>, params: Awaited<PagePropsWithParams['params']> }
const BLUR_FADE_DELAY = 0.04;
export function Projects(props: Props) {
    const { collection: { docs }, params } = props || {}
    const projects = docs.map((project, id) => (
        <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
            <ProjectCard project={project} params={params} />
        </BlurFade>
    ))
    return (
        <div className="space-y-2">
            <BackButton />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
        </div>
    )
}