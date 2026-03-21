import type { IContactProps } from "@/payload-types";
import type { BlockProps } from "@/types";
import { SectionPresentationCard } from "../../components/SectionPresentationCard";
import { FormBlock } from "../Form/form-block";


const BLUR_FADE_DELAY = 0.04;
export async function Contact(props: BlockProps<'contact'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        blockName,
        content,
        enableIntro,
        form: formFromProps,
        id,
        introContent
    } = blockProps || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <section id="contact" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow">
            <SectionPresentationCard params={params} searchParams={searchParams} heading='Get in Touch' label='Contact' description={content} />
            {/* <div className="grid items-center justify-center gap-4 px-4 text-center w-full"> */}

                <FormBlock
                    searchParams={searchParamsFromProps}
                    params={paramsFromProps}
                    blockProps={{
                        blockType: blockType as 'formBlock',
                        form: formFromProps as NonNullable<IContactProps['form']>,
                        enableIntro,
                        introContent
                    }}
                />
            {/* </div> */}
        </section>
    )
}