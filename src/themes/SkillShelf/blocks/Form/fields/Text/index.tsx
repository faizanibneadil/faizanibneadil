import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, { required })
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
      <Input disabled={props.disabled} defaultValue={defaultValue} id={name} type="text" {...props} />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}