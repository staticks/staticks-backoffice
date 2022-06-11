import React from 'react'
import tw, { TwStyle } from 'twin.macro'
import { nanoid } from 'nanoid'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // 조건부 속성
  label?: string
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const InputStyle: {
  [key: string]: TwStyle | TwStyle[]
} = {
  common: tw`cursor-pointer`,
  text: tw`w-full border border-gray-200 py-2 px-4 rounded text-base`,
  email: tw`w-full border border-gray-200 py-2 px-4 rounded text-base`,
  password: tw`w-full border border-gray-200 py-2 px-4 rounded text-base`,
  number: tw`w-full border border-gray-200 py-2 px-4 rounded text-base`,
  radio: [
    tw`appearance-none border border-gray-300 w-5 h-5 rounded-full relative checked:bg-indigo-500`,
    tw`checked:before:content[''] checked:before:block checked:before:absolute checked:before:top-1/2 checked:before:-mt-0.5 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2`,
    tw`checked:before:w-2.5 checked:before:h-1.5 checked:before:border-l-2 checked:before:border-b-2 checked:before:border-white checked:before:-rotate-45`,
  ],
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, id, value, ...rest }: InputProps, ref) => {
    const uniqueId = nanoid()
    return (
      <div css={label ? tw`flex items-center gap-2` : null}>
        <input
          id={uniqueId}
          ref={ref}
          type={type}
          css={[InputStyle.common, InputStyle[type]]}
          value={value}
          {...rest}
        />
        {label && <label htmlFor={uniqueId}>{label}</label>}
      </div>
    )
  },
)

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ style, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        css={[tw`border border-gray-200 py-2 px-4 rounded text-base `]}
        {...rest}
      >
        <option value="">선택</option>
      </select>
    )
  },
)
