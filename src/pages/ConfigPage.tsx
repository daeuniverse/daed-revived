import { useConfigsQuery } from '~/apis/query'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'

export const ConfigPage = () => {
  const configsQuery = useConfigsQuery()

  return (
    <div className="space-y-6">
      <p>Configs</p>

      {configsQuery.data?.configs.map((config, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="uppercase">{config.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <p>Config Content</p>
          </CardContent>

          <CardFooter>
            <p>Config Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
