import React from 'react'
import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  hasOutlet?: boolean
}

export const View: React.FC<ViewProps> = ({ hasOutlet, children }) => {
  return (
    <div tw="bg-gray-50 flex justify-center items-center h-[100vh] overflow-y-auto">
      {hasOutlet ? <Outlet /> : children}
    </div>
  )
}

export const ViewBox: React.FC<ViewProps> = ({ children, ...rest }) => {
  return (
    <div css={[tw`border border-gray-200 bg-white rounded-lg p-8`]} {...rest}>
      {children}
    </div>
  )
}
