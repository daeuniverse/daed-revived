import { QueryErrorResetBoundary } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { HashRouter } from 'react-router-dom'
import { App } from '~/App'
import { Bootstrap } from '~/Bootstrap'
import { Providers } from '~/Providers'
import { GlobalFallbackComponent } from '~/components/GlobalFallbackComponent'
import { Toaster } from '~/components/ui/toaster'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '~/index.css'

const root = document.getElementById('root')!

ReactDOM.createRoot(root).render(
  <HashRouter>
    <Providers>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary, error }) => (
              <GlobalFallbackComponent resetErrorBoundary={resetErrorBoundary} error={error} />
            )}
          >
            <Bootstrap>
              <App />
            </Bootstrap>

            <Toaster />

            <ReactQueryDevtools position="bottom-right" />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Providers>
  </HashRouter>
)
