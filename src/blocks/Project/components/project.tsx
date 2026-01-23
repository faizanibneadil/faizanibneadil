import React from "react";
import { RichText } from '@payloadcms/richtext-lexical/react';
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import type { BlockProps } from "@/types";
import { getProjectById } from "@/utilities/getProjectById";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

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
        <section id="projects" aria-label={blockName ?? blockType}>
            <div className="space-y-12 w-full py-12">
                <BlurFade delay={BLUR_FADE_DELAY * 11}>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                My Projects
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                {heading}
                            </h2>
                            <div className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                <RichText data={description as SerializedEditorState} />
                            </div>
                        </div>
                    </div>
                </BlurFade>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                    {projects?.map((project, idx) => (
                        <React.Suspense key={`project-${typeof project === 'number' ? project : project.id}`}>
                            <BlurFade delay={BLUR_FADE_DELAY * 12 + idx * 0.05}>
                                <ProjectCard params={params} searchParams={searchParams} project={typeof project === 'number' ? getProjectById(project) : project} />
                            </BlurFade>
                        </React.Suspense>
                    ))}
                </div>
            </div>
        </section>
    )
}