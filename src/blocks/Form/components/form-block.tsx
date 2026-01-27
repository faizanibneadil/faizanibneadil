import { Suspense } from "react";
import { BlockProps } from "@/types";
import { getFormByFormId } from "@/utilities/getFormByFormId";
import { Form } from "./form";

export async function FormBlock(props: BlockProps<'formBlock'>) {
    const {
        blockProps,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        blockType,
        form: formFromProps,
        blockName,
        enableIntro,
        id,
        introContent
    } = blockProps || {}


    const form = await getFormByFormId(typeof formFromProps === 'number' ? formFromProps : formFromProps?.id)

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    return (
        <Suspense fallback='Loading...'>
            <Form blockProps={{ ...blockProps, form }} params={paramsFromProps} searchParams={searchParamsFromProps} />
        </Suspense>
    )
}