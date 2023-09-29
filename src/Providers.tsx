import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'
import { ThemeProvider } from '~/components/ui/theme-provider'
import { TooltipProvider } from '~/components/ui/tooltip'
import { GraphqlClientProvider } from '~/contexts'

export const QueryClientRootProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <GraphqlClientProvider>
      <QueryClientProvider
        client={new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, suspense: true } } })}
      >
        {children}
      </QueryClientProvider>
    </GraphqlClientProvider>
  )
}

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider defaultTheme="system" storageKey="theme">
    <TooltipProvider>
      <QueryClientRootProvider>{children}</QueryClientRootProvider>
    </TooltipProvider>
  </ThemeProvider>
)
