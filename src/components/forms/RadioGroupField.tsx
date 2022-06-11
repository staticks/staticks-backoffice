import React from 'react'
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import tw from 'twin.macro'
import { Input, InputProps } from './Input'

export interface Option {
  label: string
  value: string
}

export interface RadioGroupFieldProps extends InputProps {
  options: Option[]
  name: string
  horizontal?: boolean
  value?: any
  errors: FieldErrors<Record<string, any>>
  register: UseFormRegisterReturn
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  id,
  label,
  options,
  horizontal = false,
  value,
  onChange,
  errors,
  register,
  ...rest
}) => {
  return (
    <div css={[tw`flex flex-col gap-2`]}>
      <label tw="text-gray-400 text-sm">{label}</label>
      <div
        css={[tw`flex`, horizontal ? tw`flex-row gap-3 flex-wrap` : tw`gap-3`]}
      >
        {options.map(option => (
          <Input
            key={option.value}
            id={id}
            type="radio"
            label={option.label}
            value={option.value}
            {...register}
          />
        ))}
      </div>
    </div>
  )
}

export default RadioGroupField
