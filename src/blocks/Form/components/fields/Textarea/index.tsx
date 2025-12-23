import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  const props = register(name, { required: required })
  return (
    <Width width={width} className='space-y-2'>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="text-red-500">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
      disabled={props.disabled}
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...props}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}