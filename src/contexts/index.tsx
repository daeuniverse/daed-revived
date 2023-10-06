import { ClientError, GraphQLClient } from 'graphql-request'
import { useAtom } from 'jotai'
import { FC, ReactNode, createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { endpointInfoAtom } from '~/atoms'

const GraphqlClientContext = createContext<GraphQLClient>(null as unknown as GraphQLClient)

export const useGraphqlClient = () => useContext(GraphqlClientContext)

export const GraphqlClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [endpointInfo, setEndpointInfo] = useAtom(endpointInfoAtom)

  const graphqlClient = useMemo(() => {
    const client = new GraphQLClient('', {
      responseMiddleware: (response) => {
        const error = (response as ClientError).response?.errors?.[0]

        if (error?.message === 'access denied') {
          navigate('/setup')
          setEndpointInfo({ endpointURL: '', token: '' })
        }

        return response
      }
    })

    if (endpointInfo.endpointURL) {
      client.setEndpoint(endpointInfo.endpointURL)
    }

    if (endpointInfo.token) {
      client.setHeader('Authorization', `Bearer ${endpointInfo.token}`)
    }

    return client
  }, [endpointInfo.endpointURL, endpointInfo.token, navigate, setEndpointInfo])

  return <GraphqlClientContext.Provider value={graphqlClient}>{children}</GraphqlClientContext.Provider>
}
