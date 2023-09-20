import { createForm } from '@felte/solid'
import { gql } from '@solid-primitives/graphql'
import { Route, Routes } from '@solidjs/router'
import { Show } from 'solid-js'
import { endpointURL, setEndpointURL, useGraphqlClient } from '~/apis'
import { Header } from '~/components'
import { Setup } from '~/pages'
import type { NumberUsersQuery } from '~/typings'

const ProtectedResources = () => {
  const graphQLClient = useGraphqlClient()

  const [numberUsers] = graphQLClient()<NumberUsersQuery>(gql`
    query NumberUsers {
      numberUsers
    }
  `)

  return (
    <div class="flex flex-col gap-2 p-2">
      <span>Number users: {numberUsers()?.numberUsers}</span>

      <button class="btn btn-secondary" onClick={() => setEndpointURL('')}>
        Clear Endpoint URL
      </button>
    </div>
  )
}

export const App = () => {
  const { form } = createForm<{
    endpointURL: string
  }>({
    onSubmit: ({ endpointURL }) => setEndpointURL(endpointURL),
  })

  return (
    <div
      class="relative flex h-screen flex-col px-2 subpixel-antialiased"
      data-theme="synthwave"
    >
      <Header />

      <form class="join flex w-full items-center" use:form={form}>
        <input
          name="endpointURL"
          class="input join-item input-bordered input-primary flex-1"
          placeholder="http://127.0.0.1:2023/graphql"
        />

        <button type="submit" class="btn btn-primary join-item">
          Set Endpoint URL
        </button>
      </form>

      <div class="p-2">
        <Routes>
          <Route path="/setup" component={Setup} />
          <Route path="*" element={<div>daed revived</div>} />
        </Routes>
      </div>

      <Show when={endpointURL()}>
        <ProtectedResources />
      </Show>
    </div>
  )
}
