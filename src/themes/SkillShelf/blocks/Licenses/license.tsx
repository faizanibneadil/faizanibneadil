import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { LicenseCard } from '@/components/license-card';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { SectionPresentationCard } from "../../components/SectionPresentationCard";

const BLUR_FADE_DELAY = 0.04;
export async function License(props: BlockProps<'license'>) {
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
        licenses
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="publications" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

<SectionPresentationCard heading={heading} label='Licenses' description={description} />

            <div className='rounded-lg border bg-background'>

                <ul className=" divide-y divide-dashed">
                {licenses?.map((license, id) => {
                        return typeof license === 'number' ? null : (

                            <LicenseCard key={license.id} license={license} params={params} searchParams={searchParams} />

                        )
                    })}
                </ul>
            </div>

        </section>
    )
}