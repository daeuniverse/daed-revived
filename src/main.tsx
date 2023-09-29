import { QueryErrorResetBoundary } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { HashRouter } from 'react-router-dom'
import { App } from '~/App'
import { Bootstrap } from '~/Bootstrap'
import { DevTools } from '~/DevTools'
import { Providers } from '~/Providers'
import { GlobalFallbackComponent } from '~/components/GlobalFallbackComponent'
import { Toaster } from '~/components/ui/toaster'

import { Suspense } from 'react'
import '~/index.css'

const root = document.getElementById('root')!

ReactDOM.createRoot(root).render(
  <Suspense>
    <HashRouter>
      <Providers>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary, error }) => (
                <GlobalFallbackComponent
                  resetErrorBoundary={resetErrorBoundary}
                  error={error}
                />
              )}
            >
              <Bootstrap>
                <App />
              </Bootstrap>

              <Toaster />

              {import.meta.env.DEV && <DevTools />}
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Providers>
    </HashRouter>
  </Suspense>
)
