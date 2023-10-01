import { zodResolver } from '@hookform/resolvers/zod'
import { SelectIcon } from '@radix-ui/react-select'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { cn } from '~/lib/ui'

export const ConfigPage = () => {
  const { t } = useTranslation()
  const schema = z.object({
    tproxyPort: z.number(),
    tproxyPortProtect: z.boolean(),
    soMarkFromDae: z.number(),
    logLevel: z.string(),
    disableWaitingNetwork: z.boolean()
  })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tproxyPort: 12345,
      tproxyPortProtect: true,
      soMarkFromDae: 80,
      logLevel: 'info',
      disableWaitingNetwork: true
    }
  })
  const defaultConfigIdQuery = useGetJSONStorageRequest(['defaultConfigID'] as const)
  const configsQuery = useConfigsQuery()
  const isDefault = (id: string) => id === defaultConfigIdQuery.data?.defaultConfigID
  const [editDialogOpened, setEditDialogOpened] = useState(false)
  const selectConfigMutation = useSelectConfigMutation()
  const removeConfigMutation = useRemoveConfigMutation()

  return (
    <div className="space-y-6">
      <p>Configs</p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {configsQuery.data?.configs.map((config, index) => (
          <Card key={index} className={cn(config.selected && 'border-primary')}>
            <CardHeader>
              <CardTitle className="uppercase">{config.name}</CardTitle>

              {isDefault(config.id) && (
                <CardDescription>
                  <Badge>{t('primitives.default')}</Badge>
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

                      <div className="py-2">
                        <Accordion type="multiple">
                          <AccordionItem value="software-options">
                            <AccordionTrigger>{t('primitives.softwareOptions')}</AccordionTrigger>

                            <AccordionContent>
                              <div className="space-y-4">
                                <FormField
                                  name="tproxyPort"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.tproxyPort')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.tproxyPort')}</FormDescription>

                                      <FormControl>
                                        <Input type="number" placeholder="12345" {...field} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="tproxyPortProtect"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.tproxyPortProtect')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.tproxyPortProtect')}</FormDescription>

                                      <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="soMarkFromDae"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.soMarkFromDae')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.soMarkFromDae')}</FormDescription>

                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="logLevel"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.logLevel')}</FormLabel>

                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                          <SelectItem value="error">{t('form.fields.logLevels.error')}</SelectItem>
                                          <SelectItem value="warn">{t('form.fields.logLevels.warn')}</SelectItem>
                                          <SelectItem value="info">{t('form.fields.logLevels.info')}</SelectItem>
                                          <SelectItem value="debug">{t('form.fields.logLevels.debug')}</SelectItem>
                                          <SelectItem value="trace">{t('form.fields.logLevels.trace')}</SelectItem>
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="disableWaitingNetwork"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.disableWaitingNetwork')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.disableWaitingNetwork')}</FormDescription>

                                      <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="interface-and-kernel-options">
                            <AccordionTrigger>{t('primitives.interfaceAndKernelOptions')}</AccordionTrigger>

                            <AccordionContent>
                              <FormField
                                name="tproxyPort"
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
                        <Button type="reset" variant="secondary" onClick={() => form.reset()}>
                          {t('actions.reset')}
                        </Button>

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
