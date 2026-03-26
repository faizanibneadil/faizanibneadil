'use client'
import { useMemo } from 'react'
import { ReactSelect, useConfig, useField, RadioGroupField } from '@payloadcms/ui'
import type { CollectionSlug, TextFieldClientProps } from 'payload'
// import { CircleCheck } from "lucide-react";


const excludeCollection: CollectionSlug[] = [
    "users",
    "media",
    "pages",
    "tenants",
    "menus",
    "socials",
    "payload-locked-documents",
    "payload-preferences",
    "payload-migrations",
    "forms",
    "form-submissions",
    "skills",
    "industries",
    "integration",
    "portfolio-settings",
    "payload-kv",
    "themes",
]

export function Collections(props: TextFieldClientProps) {
    const { path } = props || {}

    const { value, setValue } = useField({ path })

    const { config: { collections } } = useConfig()

    const options = useMemo(() => {
        let opts = []
        for (const { slug } of collections) {
            if (excludeCollection.includes(slug)) {
                continue
            }
            opts.push({
                label: slug.charAt(0).toUpperCase() + slug.slice(1),
                value: slug,
            })
        }
        return opts
    }, [collections?.length])


    const defaultValue = options?.find(opts => {
        return opts.value === value
    })

    return <ReactSelect
        isSearchable={false}
        isClearable={false}
        isMulti={false}
        value={defaultValue}
        options={options}
        onChange={option => {
            setValue(Array.isArray(option) ? option.at(0)?.value : option.value)
        }}
    />
}