import { css } from '@emotion/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  hasOutlet?: boolean
  page?: boolean
}

export const View: React.FC<ViewProps> = ({ hasOutlet, children }) => {
  return (
    <div tw="bg-gray-50 flex justify-center h-[100vh] overflow-y-auto">
      {hasOutlet ? <Outlet /> : children}
    </div>
  )
}

export const ViewBox: React.FC<ViewProps> = ({ children, ...rest }) => {
  return (
    <div
      css={[
        tw`border border-gray-200 bg-white rounded-lg p-8 my-auto`,
        css`
          height: max-content;
        `,
      ]}
      {...rest}
    >
      {children}
    </div>
  )
}

export const ViewPage: React.FC<ViewProps> = ({ children, ...rest }) => {
  return (
    <div
      css={[
        tw`border border-gray-200 bg-white rounded-lg p-8`,
        tw`w-full max-w-[800px] mx-5 my-10 overflow-auto`,
      ]}
    >
      {children}
    </div>
  )
}
