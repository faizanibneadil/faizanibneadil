'use client'
import { useMemo } from 'react'
import { ReactSelect, useConfig, useField } from '@payloadcms/ui'
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
    "tenants",
    "skills",
    "industries",
    "integration",
    "portfolio-settings",
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

    // return (
    //     <div className="grid w-full grid-cols-3 gap-4">
    //         {options.map((option) => (
    //             <button
    //                 type='button'
    //                 onClick={() => {
    //                     setValue(option.value)
    //                 }}
    //                 key={option.value} className="card">
    //                 <span className="card__title text-left">{option.label}</span>
    //                 <div className="card__actions">
    //                     {option.value === value
    //                         ? <CircleCheck key={option.value} className="absolute top-0 right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 fill-blue-500 stroke-white text-primary group-data-[state=unchecked]:hidden" />
    //                         : null}
    //                 </div>
    //             </button>
    //         ))}
    //     </div>
    // )
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