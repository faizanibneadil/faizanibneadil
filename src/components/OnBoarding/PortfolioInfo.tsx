'use client'
import { cn } from "@/lib/utils"
import darkLogoSrc from '../../../public/graphics/skillshelf-text-dark.svg'
import { Branding } from "../branding"
import { Button } from "../ui/button"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { PortfolioInfoUpdate } from "@/utilities/actions/PortfolioInfoUpdate"
import React from "react"
import { useForm } from "react-hook-form"

export type TPortfolioFormValue = {
    domain: string,
    slug: string,
    label: string
}

export const PortfolioInfo = () => {
    const [isPending, startTransition] = React.useTransition()

    const form = useForm<TPortfolioFormValue>({
        defaultValues: {
            domain: '',
            slug: '',
            label: ''
        },
        disabled: isPending
    })

    const OnSubmit = form.handleSubmit(values => {
        try {
            startTransition(async () => {
                await PortfolioInfoUpdate({
                    ...values
                })
            })
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <div className="relative w-full overflow-hidden md:h-svh">
            <div
                className={cn(
                    "relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center p-6 md:p-8"
                )}
            >
                <div className="flex justify-center mb-10">
                    <Branding
                        alt="SkillShelf Logo"
                        className='w-full h-8'
                        fill={true}
                        darkSrc={darkLogoSrc}
                        lightSrc={darkLogoSrc}
                        fetchPriority='high'
                        loading='lazy'
                        unoptimized={true} />
                </div>

                <div className="fade-in slide-in-from-bottom-4 w-full animate-in space-y-4 duration-600">
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-bold text-2xl tracking-wide">Portfolio Information</h1>
                        <p className="text-base text-muted-foreground">
                            Provide your portfolio domain, slug & label
                        </p>
                    </div>
                    <form onSubmit={OnSubmit} className="space-y-2">
                        <Field>
                            <FieldLabel className="capitalize" htmlFor='domain'>
                                domain
                            </FieldLabel>
                            <Input id='domain' {...form.register('domain', {
                                disabled: form?.formState.disabled,
                                required: true,
                            })} />
                            <FieldError errors={[form.formState.errors.domain]} />
                        </Field>
                        <Field>
                            <FieldLabel className="capitalize" htmlFor='slug'>
                                slug
                            </FieldLabel>
                            <Input id='slug' {...form.register('slug', {
                                disabled: form?.formState.disabled,
                                required: true,
                            })} />
                            <FieldError errors={[form.formState.errors.slug]} />
                        </Field>
                        <Field>
                            <FieldLabel className="capitalize" htmlFor='label'>
                                label
                            </FieldLabel>
                            <Input id='label' {...form.register('label', {
                                disabled: form?.formState.disabled,
                                required: true,
                            })} />
                            <FieldError errors={[form.formState.errors.label]} />
                        </Field>

                        <Button type='submit' className="w-full" size="sm">
                            Continue
                        </Button>
                    </form>

                </div>

            </div>
        </div>
    )
}