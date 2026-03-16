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
        <div className="rounded-lg border bg-background" key={project.title}>
            <ProjectCard project={project} params={params} searchParams={searchParams} />
        </div>
    ))
    return <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[800px] mx-auto rounded-lg bg-border shadow ">{projects}</div>
}