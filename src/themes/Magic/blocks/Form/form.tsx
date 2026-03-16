'use client'

import RichText from "@/components/RichText"
import type { BlockProps as BlockParams } from "@/types"
import { useRouter } from "next/navigation"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { formFields } from "./fields"
import { Button } from "@/components/ui/button"
import BlurFade from "@/components/magicui/blur-fade"
import { getClientSideURL } from "@/utilities/getURL"
import { Width } from "./fields/Width"

type Form = Exclude<BlockParams<'formBlock'>['blockProps']['form'], number>
type BlockProps = Omit<BlockParams<'formBlock'>['blockProps'], 'form'> & { form: Form | Promise<Form> }

const BLUR_FADE_DELAY = 0.04;
export function Form(props: { blockProps: BlockProps } & Omit<BlockParams<'formBlock'>, 'blockProps'>) {
    const {
        blockProps: {
            blockType,
            form: fromFromProps,
            blockName,
            enableIntro,
            id,
            introContent
        },
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? React.use(paramsFromProps) : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? React.use(searchParamsFromProps) : searchParamsFromProps
    const formConfig = fromFromProps instanceof Promise ? React.use(fromFromProps) : fromFromProps

    const [isLoading, setIsLoading] = React.useState(false)
    const [hasSubmitted, setHasSubmitted] = React.useState<boolean>()
    const [error, setError] = React.useState<{ message: string; status?: string } | undefined>()
    const router = useRouter()

    const form = useForm({
        defaultValues: formConfig?.fields as NonNullable<Form['fields']> ?? {},
        disabled: isLoading
    })

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
    } = form

    const onSubmit = handleSubmit(async (values) => {
        let loadingTimerID: ReturnType<typeof setTimeout>
        setError(undefined)

        const dataToSend = Object.entries(values).map(([name, value]) => ({
            field: name,
            value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
            setIsLoading(true)
        }, 1000)

        try {
            const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
                body: JSON.stringify({
                    form: formConfig?.id,
                    ...(typeof formConfig?.tenant === 'number' && {
                        tenant: formConfig?.tenant
                    }),
                    tenant: typeof formConfig?.tenant === 'object'
                        ? formConfig?.tenant?.id
                        : formConfig?.tenant,
                    submissionData: dataToSend,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })

            const res = await req.json()

            clearTimeout(loadingTimerID)

            if (req.status >= 400) {
                setIsLoading(false)

                setError({
                    message: res.errors?.[0]?.message || 'Internal Server Error',
                    status: res.status,
                })

                return
            }

            setIsLoading(false)
            setHasSubmitted(true)

            if (formConfig?.confirmationType === 'redirect' && formConfig?.redirect) {
                const { url } = formConfig?.redirect
                const redirectUrl = url
                if (redirectUrl) router.push(redirectUrl)
            }
        } catch (err) {
            console.warn(err)
            setIsLoading(false)
            setError({
                message: 'Something went wrong.',
            })
        }
    })

    return (
        <section id="contact" aria-label={blockName ?? blockType} className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-8 md:px-4 dark:bg-secondary/40">
            <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />
            {/* <div className="grid items-center justify-start gap-4 text-center w-full"> */}
            <div className="space-y-1">
                <h2 className="text-center font-semibold text-2xl tracking-tight md:text-4xl">
                    {formConfig?.title}
                </h2>
                {enableIntro && introContent && !hasSubmitted && (
                    <BlurFade delay={BLUR_FADE_DELAY * 16}>
                        <div className="mx-auto w-full text-foreground md:text-sm lg:text-sm xl:text-sm">
                            <RichText className="text-balance text-center text-muted-foreground text-sm md:text-base" searchParams={searchParams} params={params} data={introContent} enableGutter={false} />
                        </div>
                    </BlurFade>
                )}
            </div>
            <FormProvider {...form}>
                {!isLoading && hasSubmitted && formConfig?.confirmationType === 'message' && formConfig?.confirmationMessage && (
                    <RichText searchParams={searchParams} params={params} data={formConfig?.confirmationMessage!} />
                )}
                {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
                {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
                {!hasSubmitted && (
                    <form id={formConfig?.id?.toString()} onSubmit={onSubmit}>
                        <div className="flex flex-wrap -mx-2 w-[calc(100%+1rem)] justify-start items-end">
                            {formConfig?.fields?.map((field, index) => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const Field: React.FC<any> = formFields?.[field.blockType as keyof typeof formFields]
                                if (Field) {
                                    return (
                                        <Field
                                            key={`${field.blockType}-${index}`}
                                            form={formConfig}
                                            {...field}
                                            {...form}
                                            control={control}
                                            errors={errors}
                                            register={register}
                                            params={params}
                                        />
                                    )
                                }
                                return null
                            })}
                            <Width width={formConfig?.submitButtonWidth as number} className="space-y-2">
                                <Button disabled={form.formState.disabled} className="h-10 w-full" form={formConfig?.id?.toString()} type="submit" variant="default">
                                    {form.formState.disabled ? (formConfig?.submitButtonLoadingText || 'Submitting...') : (formConfig?.submitButtonLabel || "Submit")}
                                </Button>
                            </Width>
                        </div>
                    </form>
                )}
            </FormProvider>
            {/* </div> */}
            <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
        </section>
    )
}