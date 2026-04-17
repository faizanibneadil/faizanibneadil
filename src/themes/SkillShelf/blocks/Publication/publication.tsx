import BlurFade from "@/components/magicui/blur-fade";
import type { BlockProps } from "@/types";
import { PublicationCard } from '@/themes/Magic/blocks/Publication/publication-card';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { SectionPresentationCard } from "../../components/SectionPresentationCard";

const BLUR_FADE_DELAY = 0.04;
export async function Publication(props: BlockProps<'publication'>) {
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
        id,
        publications
    } = blockProps || {}

    return (
        <section id="publications" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">

<SectionPresentationCard params={params} searchParams={searchParams} heading={heading} label='Publications' description={description} />

            <div className='rounded-lg border bg-background'>

                <ul className=" divide-y divide-dashed">
                    {publications?.map((publication, id) => {
                        return typeof publication === 'number' ? null : (

                            <PublicationCard key={publication.id} publication={publication} params={params} searchParams={searchParams} />

                        )
                    })}
                </ul>
            </div>

        </section>
    )
}