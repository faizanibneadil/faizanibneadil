'use client'
import { ReactSelect, useConfig, useField } from '@payloadcms/ui'
import { ReactSelectAdapterProps } from 'node_modules/@payloadcms/ui/dist/elements/ReactSelect/types'
import { TextFieldClientProps } from 'payload'
import React from 'react'

const excludeCollection = [
    "users",
    "icons",
    "media",
    "pages",
    "tenants",
    "menus",
    "socials",
    "payload-jobs",
    "payload-locked-documents",
    "payload-preferences",
    "payload-migrations",
    "forms",
    "form-submissions"
]

export function Collections(props: TextFieldClientProps) {
    const { path } = props || {}
    const { value, setValue } = useField({ path })
    const { config: { collections } } = useConfig()
    const options = React.useMemo(() => {
        const collectionsWithoutFilters = collections?.map(collection => ({
            label: collection.slug.charAt(0).toUpperCase() + collection.slug.slice(1),
            value: collection.slug,
        })) || []
        const collectionsWithFilters = collectionsWithoutFilters.filter(collection => {
            return !excludeCollection.includes(collection.value)
        })
        return collectionsWithFilters || []
    }, [collections])
    const onChange = React.useCallback((value: { label: string, value: string }) => {
        setValue(value.value)
    }, [setValue])
    return <ReactSelect isSearchable={false} isClearable isMulti={false} value={{
        label: (value as string)?.charAt(0).toUpperCase() + (value as string)?.slice(1),
        value: value
    }} options={options} onChange={onChange as ReactSelectAdapterProps['onChange']} />
}