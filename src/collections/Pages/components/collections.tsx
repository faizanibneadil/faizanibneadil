'use client'
import { ReactSelect, useConfig, useField } from '@payloadcms/ui'
import { ReactSelectAdapterProps } from 'node_modules/@payloadcms/ui/dist/elements/ReactSelect/types'
import { TextFieldClientProps } from 'payload'
import React from 'react'

export function Collections(props: TextFieldClientProps) {
    const { path } = props || {}
    const { value, setValue } = useField({ path })
    const { config: { collections } } = useConfig()
    const options = React.useMemo(() => {
        return collections?.map(collection => ({
            label: collection.slug.charAt(0).toUpperCase() + collection.slug.slice(1),
            value: collection.slug,
        })) || []
    }, [collections])
    const onChange = React.useCallback((value: { label: string, value: string }) => {
        setValue(value.value)
    }, [])
    return <ReactSelect isSearchable={false} isClearable isMulti={false} value={{
        label: (value as string)?.charAt(0).toUpperCase() + (value as string)?.slice(1),
        value: value
    }} options={options} onChange={onChange as ReactSelectAdapterProps['onChange']} />
}