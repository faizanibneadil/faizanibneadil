import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { CertificateCard } from '@/components/certificate-card';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { SectionPresentationCard } from "../../components/SectionPresentationCard";

const BLUR_FADE_DELAY = 0.04;
export async function Certification(props: BlockProps<'certification'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        certifications,
        description,
        id
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="project" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

<SectionPresentationCard heading={heading} label='Certifications' description={description} />

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