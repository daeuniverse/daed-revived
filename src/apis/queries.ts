import { gql } from '@solid-primitives/graphql'
import { useGraphqlClient } from '~/apis'

export const userQuery = () => {
  const query = useGraphqlClient()

  return query(gql`
    query User {
      user {
        username
        name
        avatar
      }
    }
  `)
}
