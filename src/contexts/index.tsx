import { GraphQLClient } from 'graphql-request'
import { useAtom } from 'jotai'
import { createContext, FC, ReactNode, useContext, useMemo } from 'react'
import { endpointInfoAtom } from '~/atoms'

const GraphqlClientContext = createContext<GraphQLClient>(
  null as unknown as GraphQLClient
)

export const useGraphqlClient = () => useContext(GraphqlClientContext)

export const GraphqlClientProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [endpointInfo] = useAtom(endpointInfoAtom)
  const graphqlClient = useMemo(() => {
    const client = new GraphQLClient('')

    if (endpointInfo.endpointURL) {
      client.setEndpoint(endpointInfo.endpointURL)
    }

    if (endpointInfo.token) {
      client.setHeader('Authorization', `Bearer ${endpointInfo.token}`)
    }

    return client
  }, [endpointInfo])

  return (
    <GraphqlClientContext.Provider value={graphqlClient}>
      {children}
    </GraphqlClientContext.Provider>
  )
}
