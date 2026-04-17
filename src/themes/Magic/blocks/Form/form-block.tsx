import { Suspense } from "react";
import { BlockProps } from "@/types";
import { getFormByFormId } from "@/utilities/getFormByFormId";
import { Form } from "./form";
import { FormBlockSkeleton } from "./form-block-skeleton";

export async function FormBlock(props: BlockProps<'formBlock'>) {
    const {
        blockProps,
        params,
        searchParams
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

    return (
        <Suspense fallback={<FormBlockSkeleton />}>
            <Form blockProps={{ ...blockProps, form }} params={params} searchParams={searchParams} />
        </Suspense>
    )
}