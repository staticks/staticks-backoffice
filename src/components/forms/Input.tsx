import React from 'react'
import tw from 'twin.macro'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', style, ...rest }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        css={[tw`border border-gray-200 py-2 px-4 rounded text-base `]}
        {...rest}
      />
    )
  },
)
