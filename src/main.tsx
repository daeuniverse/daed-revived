import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DevTools } from 'jotai-devtools'
import { RefreshCwIcon } from 'lucide-react'
import { FC } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { HashRouter } from 'react-router-dom'
import { App } from '~/App'
import { Button } from '~/components/ui/button'
import { ThemeProvider } from '~/components/ui/theme-provider'
import { Toaster } from '~/components/ui/toaster'
import { TooltipProvider } from '~/components/ui/tooltip'
import { GraphqlClientProvider } from '~/contexts'
import { initializeI18n } from '~/i18n'

import '~/index.css'

const FallbackComponent: FC<FallbackProps> = ({ error }) => {
  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-4">
      <div className="text-center font-bold">{error.message}</div>

      <Button onClick={() => window.location.reload()}>
        <RefreshCwIcon className="mr-2 h-4 w-4" />
        Refresh
      </Button>
    </div>
  )
}

initializeI18n().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <HashRouter>
      <GraphqlClientProvider>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider defaultTheme="system" storageKey="theme">
            <TooltipProvider>
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                <App />
              </ErrorBoundary>

              <Toaster />
            </TooltipProvider>

            <DevTools theme="dark" />
          </ThemeProvider>
        </QueryClientProvider>
      </GraphqlClientProvider>
    </HashRouter>
  )
})
