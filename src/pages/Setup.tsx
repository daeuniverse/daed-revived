import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'
import { gql, request } from '@solid-primitives/graphql'
import { useNavigate } from '@solidjs/router'
import { z } from 'zod'
import { setEndpoint } from '~/apis'
import { TokenQuery } from '~/gql'

const schema = z.object({
  endpointURL: z.string().nonempty(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
})

export const Setup = () => {
  const navigate = useNavigate()

  const { form } = createForm<z.infer<typeof schema>>({
    extend: validator({ schema }),
    onSubmit: async ({ endpointURL, username, password }) => {
      const { token } = await request<TokenQuery>(
        endpointURL,
        gql`
          query Token($username: String!, $password: String!) {
            token(username: $username, password: $password)
          }
        `,
        {
          variables: {
            username,
            password,
          },
        },
      )

      setEndpoint({
        url: endpointURL,
        token,
      })

      navigate('/')
    },
  })

  return (
    <form class="join flex w-full items-center" use:form={form}>
      <input
        name="endpointURL"
        class="input join-item input-bordered input-primary flex-1"
        placeholder="http://127.0.0.1:2023/graphql"
      />

      <input
        name="username"
        class="input join-item input-bordered input-primary flex-1"
      />
      <input
        name="password"
        type="password"
        class="input join-item input-bordered input-primary flex-1"
      />

      <button type="submit" class="btn btn-primary join-item">
        Set Endpoint URL
      </button>
    </form>
  )
}
