import { Suspense } from "react";
import { TFormBlockProps } from "@/payload-types";
import { PagePropsWithParams } from "@/types";
import { getFormByFormId } from "@/utilities/getFormByFormId";
import { Form } from "./form";

export async function FormBlock(props: { blockProps: TFormBlockProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps,
        params: paramsFromProps
    } = props || {}
    const params = await paramsFromProps

    const form = typeof blockProps?.form === 'number'
        ? getFormByFormId({ id: blockProps.form })
        : blockProps.form

    return (
        <Suspense fallback='Loading...'>
            <Form blockProps={{ ...blockProps, form }} params={params} />
        </Suspense>
    )
}