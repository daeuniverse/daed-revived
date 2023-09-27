import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { UserQuery } from '~/apis/gql'
import { useGraphqlClient } from '~/contexts'

export const HomePage = () => {
  const graphqlClient = useGraphqlClient()
  const userQuery = useQuery<UserQuery>({
    queryKey: ['user'],
    queryFn: () =>
      graphqlClient.request(gql`
        query User {
          user {
            username
            name
            avatar
          }
        }
      `)
  })

  return (
    <div className="flex flex-col gap-4">
      <p>{userQuery.data?.user.name}</p>
      <p>{userQuery.data?.user.avatar}</p>
      <h2>{userQuery.data?.user.username}</h2>
    </div>
  )
}
