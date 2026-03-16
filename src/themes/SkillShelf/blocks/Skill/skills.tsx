import BlurFade from "@/components/magicui/blur-fade";
import { Skill as RenderSkill, SkillSkeleton } from "@/components/render-skill";
import { getSkillById } from "@/utilities/getSkillById";
import type { BlockProps } from "@/types";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { Suspense } from "react";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { cn } from "@/lib/utils";
import { SectionPresentationCard } from "../../components/SectionPresentationCard";

const BLUR_FADE_DELAY = 0.04;
export async function Skill(props: BlockProps<'skill'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        blockName,
        id,
        showAllSkills,
        userSkills,
        heading,
        description
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = paramsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    let providedSkills = userSkills
    if (showAllSkills === true) {
        try {
            const isNumericDomain = !Number.isNaN(Number(params.domain))
            const payload = await getPayloadConfig()
            const getSkills = await payload.find({
                collection: 'skills',
                where: {
                    or: [
                        {
                            'tenant.slug': {
                                equals: params.domain
                            }
                        },
                        ...(isNumericDomain
                            ? [{
                                'tenant.id': {
                                    equals: Number(params.domain),
                                },
                            }]
                            : []),
                    ]
                },
                pagination: false
            })
            providedSkills = getSkills.docs
        } catch (error) {
            console.error('Something went wrong to get all skills from skills collection in skills block', error)
            providedSkills = userSkills?.length === 0 ? [] : userSkills
        }
    }

    return (
        <section id="skills" aria-label={blockName ?? blockType} className="rounded-lg bg-border shadow">
            <SectionPresentationCard heading={heading} label='Skills' description={description} />
            <div className="flex flex-wrap gap-1 rounded-lg border bg-background p-4">
                {providedSkills?.map((skill, id) => (
                    <Suspense key={`skill-${id}`} fallback={<SkillSkeleton />}>
                        <RenderSkill width='2em' height='2em' skill={typeof skill === 'number' ? getSkillById(skill) : skill} id={id} />
                    </Suspense>
                ))}
            </div>
        </section>
    )
}


