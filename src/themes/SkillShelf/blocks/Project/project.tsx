import type { BlockProps } from "@/types";
import { getProjectById } from "@/utilities/getProjectById";
import React from "react";
import { SectionPresentationCard } from "../../components/SectionPresentationCard";
import { ProjectCard } from "./ProjectCard";

const BLUR_FADE_DELAY = 0.04;
export async function Project(props: BlockProps<'project'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        description,
        id,
        projects
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="project" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

            <SectionPresentationCard params={params} searchParams={searchParams} heading={heading} label='Projects' description={description} />

            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[800px] mx-auto border">
                {projects?.map((project, idx) => (
                    <React.Suspense key={`project-${typeof project === 'number' ? project : project.id}`}>
                            <ProjectCard params={params} searchParams={searchParams} project={typeof project === 'number' ? getProjectById(project) : project} />
                    </React.Suspense>
                ))}
            </div>

        </section>

    )
}