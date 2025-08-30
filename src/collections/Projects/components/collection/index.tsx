import BlurFade from "@/components/magicui/blur-fade"
import { ProjectCard } from "@/components/project-card"
import { DataFromCollectionSlug, PaginatedDocs } from "payload"

const BLUR_FADE_DELAY = 0.04;
export function Projects(props: PaginatedDocs<DataFromCollectionSlug<'projects'>>) {
    const { docs } = props || {}
    const projects = docs.map((project, id) => {
        return (
            <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            >
                <ProjectCard {...project} />
            </BlurFade>
        )
    })
    return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
}