import { createGraphQLClient } from '@solid-primitives/graphql'
import { makePersisted } from '@solid-primitives/storage'
import { createSignal } from 'solid-js'
import type { Endpoint } from '~/typings'

export const [endpoint, setEndpoint] = makePersisted(createSignal<Endpoint>(), {
  name: 'endpoint',
  storage: localStorage
})

export const useGraphqlClient = () => {
  const endpointValue = endpoint()!

  return createGraphQLClient(endpointValue.url, {
    headers: {
      Authorization: `Bearer ${endpointValue.token}`
    }
  })
}
