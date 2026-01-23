import BlurFade from "@/components/magicui/blur-fade"
import { ProjectCard } from "@/components/project-card"
import type { CollectionProps } from "@/types";

const BLUR_FADE_DELAY = 0.04;
export async function Projects(props: CollectionProps<'projects'>) {
    const {
        collection,
        params: paramsFromProps,
        searchParams: searchParamsFromProps,
    } = props || {}

    const {
        docs,
        hasNextPage,
        hasPrevPage,
        limit,
        pagingCounter,
        totalDocs,
        totalPages,
        nextPage,
        page,
        prevPage,
    } = collection || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    const projects = docs.map((project, id) => (
        <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
            <ProjectCard project={project} params={params} searchParams={searchParams} />
        </BlurFade>
    ))
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
        </div>
    )
}