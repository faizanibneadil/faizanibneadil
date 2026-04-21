import type { BlockProps } from "@/types";
import { SectionPresentationCard } from "../../components/SectionPresentationCard";
import { LicenseCard } from "./LicenseCard";

const BLUR_FADE_DELAY = 0.04;
export async function License(props: BlockProps<'license'>) {
    const {
        blockProps,
        params,
        searchParams
    } = props || {}

    const {
        blockType,
        heading,
        blockName,
        description,
        licenses
    } = blockProps || {}

    return (
        <section id="publications" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">
            <SectionPresentationCard params={params} searchParams={searchParams} heading={heading} label='Licenses' description={description} />
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