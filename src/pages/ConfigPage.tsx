import { SelectIcon } from '@radix-ui/react-select'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRemoveConfigMutation, useSelectConfigMutation } from '~/apis/mutation'
import { useConfigsQuery, useGetJSONStorageRequest } from '~/apis/query'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

export const ConfigPage = () => {
  const { t } = useTranslation()
  const form = useForm()
  const defaultConfigIdQuery = useGetJSONStorageRequest(['defaultConfigID'] as const)
  const configsQuery = useConfigsQuery()
  const isDefault = (id: string) => id === defaultConfigIdQuery.data?.defaultConfigID
  const [editDialogOpened, setEditDialogOpened] = useState(false)
  const selectConfigMutation = useSelectConfigMutation()
  const removeConfigMutation = useRemoveConfigMutation()

  return (
    <div className="space-y-6">
      <p>Configs</p>

      <div className="grid grid-cols-2">
        {configsQuery.data?.configs.map((config, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="uppercase">{config.name}</CardTitle>

              {isDefault(config.id) && (
                <CardDescription>
                  <Badge>default</Badge>
                </CardDescription>
              )}
            </CardHeader>

            <CardFooter className="gap-2">
              {!config.selected && (
                <Button className="gap-2" onClick={() => selectConfigMutation.mutate({ id: config.id })}>
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
                        <DialogDescription>{config.id}</DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <Accordion type="multiple">
                          <AccordionItem value="software-options">
                            <AccordionTrigger>Software Options</AccordionTrigger>

                            <AccordionContent>
                              <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('form.fields.password')}</FormLabel>

                                    <FormControl>
                                      <Input type="number" placeholder="daeuniverse" {...field} />
                                    </FormControl>

                                    <FormDescription>
                                      {t('form.descriptions.pleaseEnter', {
                                        fieldName: t('form.fields.password')
                                      })}
                                    </FormDescription>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="interface-and-kernel-options">
                            <AccordionTrigger>Interface and Kernel Options</AccordionTrigger>

                            <AccordionContent>
                              <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('form.fields.password')}</FormLabel>

                                    <FormControl>
                                      <Input type="password" placeholder="daeuniverse" {...field} />
                                    </FormControl>

                                    <FormDescription>
                                      {t('form.descriptions.pleaseEnter', {
                                        fieldName: t('form.fields.password')
                                      })}
                                    </FormDescription>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

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
                  disabled={isDefault(config.id)}
                  onClick={() => removeConfigMutation.mutate({ id: config.id })}
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
