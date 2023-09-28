import { Editor } from '@monaco-editor/react'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { UserQuery } from '~/apis/gql'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { useGraphqlClient } from '~/contexts'
import { options } from '~/editor/options'

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
    <div className="space-y-6">
      <p>Name: {userQuery.data?.user.name}</p>
      <p>Username: {userQuery.data?.user.username}</p>

      <Avatar>
        {userQuery.data?.user.avatar && (
          <AvatarImage src={userQuery.data.user.avatar} />
        )}

        <AvatarFallback>{userQuery.data?.user.username[0]}</AvatarFallback>
      </Avatar>

      <Editor
        height="20vh"
        theme="vs-dark"
        options={options}
        language="routingA"
      />
    </div>
  )
}
