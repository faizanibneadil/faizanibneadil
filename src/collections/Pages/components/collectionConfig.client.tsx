'use client'
import type { SelectFieldClientComponent } from 'payload'

import { SelectField, useField } from '@payloadcms/ui'

import React from 'react'

export const CollectionConfig: SelectFieldClientComponent = (props) => {
    const { value, setValue } = useField({ path: props?.path })
    return <SelectField {...props} />
}