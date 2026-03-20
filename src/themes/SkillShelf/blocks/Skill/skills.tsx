import { getSkillById } from "@/utilities/getSkillById";
import type { BlockProps } from "@/types";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { Suspense } from "react";
import { SectionPresentationCard } from "../../components/SectionPresentationCard";
import { SkillRenderer } from "./SkillRenderer";

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
            <SectionPresentationCard params={params} searchParams={searchParams as any} heading={heading} label='Skills' description={description} />
            <div className="grid grid-cols-1 md:grid-cols-2">
                {providedSkills?.map((skill, id) => (
                    <Suspense key={`skill-${id}`} fallback={null}>
                        <SkillRenderer width='2em' height='2em' skill={typeof skill === 'number' ? getSkillById(skill) : skill} id={id} />
                    </Suspense>
                ))}
            </div>
        </section>
    )
}


