'use client'

import { Icon as Iconify } from "@iconify/react"
import { TextField, useDebounce, useField, RenderCustomComponent, useConfig } from "@payloadcms/ui"
import type { TextFieldClientProps } from "payload"
import { useEffect, useState } from "react"

export function Icon(props: TextFieldClientProps) {
    const {config:{admin: { }}} = useConfig()
    const field = useField({ ...props, validate: undefined })
    const [_icons, setIcons] = useState<Record<string, any>>({ icons: [] })


    const debouncedValue = useDebounce(field.value, 1000)

    useEffect(() => {
        function getIcons() {
            const url = new URL('/search', 'https://api.iconify.design')
            url.searchParams.set('query', String(debouncedValue).includes(':') ? String(debouncedValue).split(':')[1] : String(debouncedValue))
            fetch(url.toString()).then(res => res.json()).then(setIcons).catch((error: Error) => {
                console.error('Something went wrong to fetch icon from iconify', error)
            })
        }
        if (debouncedValue || field.value) {
            void getIcons()
        }
    }, [debouncedValue])

    const icons = _icons?.icons?.map((icon: string, idx: number) => (
        <div role="button" onClick={() => field.setValue(icon)} key={`${icon}-${idx}`} className="cursor-pointer p-2">
            <Iconify width='100%' height='1.5em' icon={icon} />
        </div>
    ))

    return (
        <>
            <TextField {...props} />
            {Boolean(icons?.length) && (
                // <div className="rounded-[var(--style-radius-s)] border border-solid border-[var(--theme-elevation-150)] p-2 bg-[var(--theme-bg)]">
                    <div className="flex flex-wrap max-w-3xl gap-2">
                        {icons}
                    </div>
                // </div>
            )}
        </>
    )
}