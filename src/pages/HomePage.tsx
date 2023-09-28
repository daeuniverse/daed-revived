import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { UserQuery } from '~/apis/gql'
import { Editor } from '~/components/Editor'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
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
        language="routingA"
        defaultValue={`
pname(NetworkManager, systemd-resolved, dnsmasq) -> must_direct
dip(geoip:private) -> direct
dip(geoip:cn) -> direct
domain(geosite:cn) -> direct 
`.trim()}
      />
    </div>
  )
}
