import { useAtom } from 'jotai'
import { Outlet, Route, Routes } from 'react-router-dom'
import { endpointInfoAtom } from '~/atoms'
import { Header } from '~/components/Header'
import { LoadingSpinner } from '~/components/LoadingSpinner'
import { ConfigPage } from '~/pages/ConfigPage'
import { DNSPage } from '~/pages/DNSPage'
import { GroupPage } from '~/pages/GroupPage'
import { HomePage } from '~/pages/HomePage'
import { NodePage } from '~/pages/NodePage'
import { NotFound } from '~/pages/NotFound'
import { RoutingPage } from '~/pages/RoutingPage'
import { SetupPage } from '~/pages/SetupPage'
import { SubscriptionPage } from '~/pages/SubscriptionPage'

const InitializeRoutes = () => {
  const [endpointInfo] = useAtom(endpointInfoAtom)
  const endpointNotReady = !endpointInfo.endpointURL || !endpointInfo.token

  if (endpointNotReady) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return <Outlet />
}

export const App = () => {
  return (
    <div className="relative flex h-screen min-w-sm flex-col">
      <div className="sticky inset-x-0 top-0 mx-auto w-full max-w-screen-2xl">
        <Header />
      </div>

      <div className="mx-auto box-border flex w-full max-w-screen-xl flex-1 flex-col overflow-y-auto overflow-x-hidden p-2 sm:p-4">
        <Routes>
          <Route path="/setup" element={<SetupPage />} />

          <Route element={<InitializeRoutes />}>
            <Route index element={<HomePage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/dns" element={<DNSPage />} />
            <Route path="/routing" element={<RoutingPage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/node" element={<NodePage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}
