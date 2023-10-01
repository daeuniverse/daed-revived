import { SelectIcon } from '@radix-ui/react-select'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useConfigsQuery, useGetJSONStorageRequest } from '~/apis/query'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { Form } from '~/components/ui/form'

export const ConfigPage = () => {
  const { t } = useTranslation()
  const defaultConfigIdQuery = useGetJSONStorageRequest(['defaultConfigID'] as const)
  const configsQuery = useConfigsQuery()
  const form = useForm()
  const [editDialogOpened, setEditDialogOpened] = useState(false)

  return (
    <div className="space-y-6">
      <p>Configs</p>

      <div>
        {configsQuery.data?.configs.map((config, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="uppercase">{config.name}</CardTitle>

              {config.id === defaultConfigIdQuery.data?.defaultConfigID && (
                <CardDescription className="py-2">
                  <Badge>default</Badge>
                </CardDescription>
              )}
            </CardHeader>

            <CardContent>
              <code>
                <pre>{JSON.stringify(config.global, null, 2)}</pre>
              </code>
            </CardContent>

            <CardFooter className="gap-2">
              {!config.selected && (
                <Button className="gap-2">
                  <SelectIcon className="w-4" />
                  {t('actions.select')}
                </Button>
              )}

              <Dialog open={editDialogOpened} onOpenChange={setEditDialogOpened}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <EditIcon className="w-4" />
                    {t('actions.edit')}
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(async (values) => {
                        console.log(values)

                        await configsQuery.refetch()

                        setEditDialogOpened(false)
                      })}
                    >
                      <DialogHeader>
                        <DialogTitle className="uppercase">{config.name}</DialogTitle>
                        <DialogDescription>hello world</DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button type="reset">{t('actions.reset')}</Button>

                        <Button type="submit" loading={form.formState.isSubmitting}>
                          {t('actions.submit')}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {!config.selected && (
                <Button
                  variant="destructive"
                  className="gap-2"
                  icon={<Trash2Icon className="w-4" />}
                  disabled={config.id === defaultConfigIdQuery.data?.defaultConfigID}
                >
                  {t('actions.remove')}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
