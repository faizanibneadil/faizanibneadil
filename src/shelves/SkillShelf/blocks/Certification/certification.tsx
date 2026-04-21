import type { BlockProps } from "@/types";
import { SectionPresentationCard } from "../../components/SectionPresentationCard";
import { CertificateCard } from "./CertificateCard";

const BLUR_FADE_DELAY = 0.04;
export async function Certification(props: BlockProps<'certification'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        certifications,
        description,
        id
    } = blockProps || {}

    return (
        <section id="project" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">
            <SectionPresentationCard params={params} searchParams={searchParams} heading={heading} label='Certifications' description={description} />
            <div className='rounded-lg border bg-background'>
                <ul className=" divide-y divide-dashed">
                    {certifications?.map((certification, id) => {
                        return typeof certification === 'number' ? null : (
                            <CertificateCard key={certification.id} certificate={certification} params={params} searchParams={searchParams} />
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}