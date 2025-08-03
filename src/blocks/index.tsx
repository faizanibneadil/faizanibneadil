import { Page } from "@/payload-types";
import { Fragment } from "react";
import { Hero } from "./Hero/components/hero";
import { About } from "./About/components/about";
import { Experiance } from "./Experiances/components/experiances";
import { Education } from "./Education/components/educations";
import { Skill } from "./Skill/components/skills";
import { Contact } from "./Contact/components/contact";
import { Hackathon } from "./Hackathon/components/hackathon";
import { Project } from "./Project/components/project";
import { Research } from "./Research/components/research";
import { Publication } from "./Publication/components/publication";
import { License } from "./Licenses/components/license";
import { Certification } from "./Certification/components/certification";
import { Achievement } from "./Achievement/components/achievement";

const _blocks = {
    hero: Hero,
    contact: Contact,
    education: Education,
    skill: Skill,
    experiance: Experiance,
    about: About,
    hackathon: Hackathon,
    project: Project,
    research: Research,
    publication: Publication,
    license: License,
    certification: Certification,
    achievement: Achievement
}

export function BlocksRenderer(props: { blocks: Page['layout'][][0] }) {
    const { blocks = [] } = props || {}

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (blockType && blockType in _blocks) {
                        const Block = _blocks[blockType]

                        if (Block) {
                            return (
                                <div className="my-16" key={`${blockType}-${index}`}>
                                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                    <Block {...block} />
                                </div>
                            )
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }
    return 'Nothing for render ...'
}