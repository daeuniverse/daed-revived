import { SelectIcon } from '@radix-ui/react-select'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { useConfigsQuery } from '~/apis/query'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'

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
            <code>
              <pre>{JSON.stringify(config.global, null, 2)}</pre>
            </code>
          </CardContent>

          <CardFooter className="gap-2">
            <Button className="gap-2">
              <SelectIcon className="w-4" />
              Select
            </Button>
            <Button variant="secondary" className="gap-2">
              <EditIcon className="w-4" />
              Edit
            </Button>
            <Button variant="destructive" className="gap-2">
              <Trash2Icon className="w-4" />
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
