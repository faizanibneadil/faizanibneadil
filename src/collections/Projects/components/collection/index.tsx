import BlurFade from "@/components/magicui/blur-fade"
import { ProjectCard } from "@/components/project-card"
import { PagePropsWithParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import Link from "next/link";
import { DataFromCollectionSlug, PaginatedDocs } from "payload"

type Props = { collection: PaginatedDocs<DataFromCollectionSlug<'projects'>>, params: Awaited<PagePropsWithParams['params']> }
const BLUR_FADE_DELAY = 0.04;
export function Projects(props: Props) {
    const { collection: { docs }, params } = props || {}
    const projects = docs.map((project, id) => {
        const { RouteWithDocSlug } = generateRoute({
            domain: params.domain as string,
            slug: params.slug as string,
            docSlug: project.slug as string
        })
        return (
            <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            >
                <Link href={RouteWithDocSlug} className="block cursor-pointer">
                    <ProjectCard {...project} />
                </Link>
            </BlurFade>
        )
    })
    return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
}