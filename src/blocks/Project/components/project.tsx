import BlurFade from "@/components/magicui/blur-fade";
import { IProjectProps } from "@/payload-types";
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ProjectCard } from "@/components/project-card";

const BLUR_FADE_DELAY = 0.04;
export function Project(props: IProjectProps) {
    const { heading, description, projects,blockName,blockType } = props || {}
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
                    {projects?.map((project, id) => {
                        return typeof project === 'number' ? null : (
                            <BlurFade
                                key={project.title}
                                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            >
                                <ProjectCard {...project} />
                            </BlurFade>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}