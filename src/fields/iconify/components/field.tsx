'use client'

import type { TextFieldClientProps } from "payload"
import { useField, Button, useDebounce, TextField } from "@payloadcms/ui"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"

export function Iconify(props: TextFieldClientProps) {
    const field = useField({ ...props, validate: undefined })
    const [open, setOpen] = useState(false)
    const [_icons, setIcons] = useState<Record<string, any>>({ icons: [] })
    const [query, setQuery] = useState('')

    const onOpenChange = useCallback((open: boolean) => {
        setOpen((val) => !val)
    }, [])

    const debouncedValue = useDebounce(field.value, 1000)

    useEffect(() => {
        function getIcons() {
            const url = new URL('/search', 'https://api.iconify.design')
            url.searchParams.set('query',  String(debouncedValue).includes(':') ? String(debouncedValue).split(':')[1] : String(debouncedValue))
            fetch(url.toString()).then(res => res.json()).then(setIcons).catch((error: Error) => {
                console.error('Something went wrong to fetch icon from iconify', error)
            })
        }
        if (debouncedValue || field.value) void getIcons()
    }, [debouncedValue])

    function onSelectIcon(icon: string) {
        field.setValue(icon)
        setOpen(false)
    }

    const icons = _icons?.icons?.map((icon: string, idx: number) => (
        <div role="button" onClick={() => onSelectIcon(icon)} key={`${icon}-${idx}`} className="cursor-pointer p-2">
            <Icon width='100%' height='1.5em' icon={icon} />
        </div>
    ))

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    disabled={field.disabled}
                    onClick={() => onOpenChange(!open)}
                    icon={field.value ? <Icon width='100%' height='2em' icon={field.value as string} /> : ['chevron']}
                    iconPosition="left"
                    iconStyle={field.value ? "none" : "with-border"}
                    buttonStyle="icon-label" el='button'
                >
                    {field.value ? `${(field.value as string)} (Change)` : 'Select icon'}
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={10} align="start" className="w-full flex flex-col gap-2 bg-transparent p-0">
                <TextField {...props} />
                {/* <div className="field-type text read-only">
                    <div className="field-type_wrap text">
                        <input onChange={({ target: { value } }) => setQuery(value)} placeholder="Search icon..." />
                    </div>
                </div> */}
                {Boolean(icons?.length) && (
                    <div className="rounded-[var(--style-radius-s)] border border-solid border-[var(--theme-elevation-150)] p-2 bg-[var(--theme-bg)]">
                        <div className="flex flex-wrap max-w-3xl gap-2">
                            {icons}
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}