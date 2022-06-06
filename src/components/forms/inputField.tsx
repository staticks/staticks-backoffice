import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { Input, InputProps } from './Input'

export interface InputFieldProps extends InputProps {
  label: string
  name: string
  errors: FieldErrors<Record<string, any>>
  register: UseFormRegisterReturn
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, name, type = 'text', errors, label, register, ...rest }, ref) => {
    return (
      <div tw="flex flex-col gap-1" ref={ref}>
        <label htmlFor={id} tw="text-gray-400 text-sm">
          {label}
        </label>
        <Input id={id} type={type} {...register} {...rest} />
        <ErrorMessage
          errors={errors}
          name={name}
          as={<p tw="text-xs text-red-500" />}
        />
      </div>
    )
  },
)
