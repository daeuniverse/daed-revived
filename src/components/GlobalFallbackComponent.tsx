import { RefreshCwIcon } from 'lucide-react'
import { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Button } from '~/components/ui/button'

export const GlobalFallbackComponent: FC<FallbackProps> = ({
  error,
  resetErrorBoundary
}) => (
  <div className="container flex h-screen flex-col items-center justify-center gap-4">
    <div className="text-center font-bold">{error.message}</div>

    <Button onClick={() => resetErrorBoundary()}>
      <RefreshCwIcon className="mr-2 h-4 w-4" />
      Refresh
    </Button>
  </div>
)
