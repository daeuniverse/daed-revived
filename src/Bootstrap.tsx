import { useAsyncEffect } from 'ahooks'
import { FC, ReactNode, useState } from 'react'
import { LoadingSpinner } from '~/components/LoadingSpinner'
import { initializeEditor } from '~/editor'
import { initializeI18n } from '~/i18n'

export const Bootstrap: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async () => {
    setLoading(true)

    await initializeI18n()
    await initializeEditor()

    setLoading(false)
  })

  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-1 flex-col items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return children
}
