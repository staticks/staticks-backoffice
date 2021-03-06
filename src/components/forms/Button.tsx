import React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      tw="bg-indigo-600 text-white py-2 px-4 rounded text-base"
      {...rest}
    >
      {children}
    </button>
  )
}
