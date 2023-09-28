import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { HashRouter } from 'react-router-dom'
import { App } from '~/App'
import { Bootstrap } from '~/Bootstrap'
import { GlobalFallbackComponent } from '~/components/GlobalFallbackComponent'
import { ThemeProvider } from '~/components/ui/theme-provider'
import { Toaster } from '~/components/ui/toaster'
import { TooltipProvider } from '~/components/ui/tooltip'
import { QueryClientRootProvider } from '~/contexts'
import { DevTools } from '~/DevTools'

import '~/index.css'

const root = document.getElementById('root')!

ReactDOM.createRoot(root).render(
  <HashRouter>
    <QueryClientRootProvider>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <TooltipProvider>
          <ErrorBoundary FallbackComponent={GlobalFallbackComponent}>
            <Bootstrap>
              <App />
            </Bootstrap>
          </ErrorBoundary>

          <Toaster />
        </TooltipProvider>

        {import.meta.env.DEV && <DevTools />}
      </ThemeProvider>
    </QueryClientRootProvider>
  </HashRouter>
)
