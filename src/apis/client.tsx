import {
  createGraphQLClient,
  GraphQLClientQuery,
} from '@solid-primitives/graphql'
import {
  Accessor,
  children,
  createContext,
  createMemo,
  createSignal,
  ParentComponent,
  useContext,
} from 'solid-js'

const GraphqlClientContext = createContext<Accessor<GraphQLClientQuery>>(
  null as unknown as Accessor<GraphQLClientQuery>,
)
export const [endpointURL, setEndpointURL] = createSignal('')
export const useGraphqlClient = () => useContext(GraphqlClientContext)

export const GraphqlClientProvider: ParentComponent = (props) => {
  const graphqlClient = createMemo(() => createGraphQLClient(endpointURL()))

  return (
    <GraphqlClientContext.Provider value={graphqlClient}>
      {children(() => props.children)()}
    </GraphqlClientContext.Provider>
  )
}
