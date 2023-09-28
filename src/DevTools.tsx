import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DevTools as JotaiDevTools } from 'jotai-devtools'
import { Fragment } from 'react'

export const DevTools = () => {
  return (
    <Fragment>
      <ReactQueryDevtools position="bottom-right" />
      <JotaiDevTools theme="dark" />
    </Fragment>
  )
}
