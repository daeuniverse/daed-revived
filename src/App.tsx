import { useAtom } from 'jotai'
import { FC, ReactNode } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import {
  useConfigsQuery,
  useDNSsQuery,
  useGeneralQuery,
  useGroupsQuery,
  useNodesQuery,
  useRoutingsQuery,
  useSubscriptionsQuery,
  useUserQuery
} from '~/apis/query'
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

const LoadingSpinnerPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}

const InitializeData: FC<{ children: ReactNode }> = ({ children }) => {
  const userQuery = useUserQuery()
  const generalQuery = useGeneralQuery()
  const groupsQuery = useGroupsQuery()
  const subscriptionsQuery = useSubscriptionsQuery()
  const nodesQuery = useNodesQuery()
  const routingsQuery = useRoutingsQuery()
  const dnssQuery = useDNSsQuery()
  const configsQuery = useConfigsQuery()

  if (
    userQuery.isLoading ||
    generalQuery.isLoading ||
    groupsQuery.isLoading ||
    subscriptionsQuery.isLoading ||
    nodesQuery.isLoading ||
    routingsQuery.isLoading ||
    dnssQuery.isLoading ||
    configsQuery.isLoading
  ) {
    return <LoadingSpinnerPage />
  }

  return children
}

const InitializeRoutes = () => {
  const [endpointInfo] = useAtom(endpointInfoAtom)
  const endpointNotReady = !endpointInfo.endpointURL || !endpointInfo.token

  if (endpointNotReady) {
    return <LoadingSpinnerPage />
  }

  return (
    <InitializeData>
      <Outlet />
    </InitializeData>
  )
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
            <Route path="/" element={<HomePage />} />
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
