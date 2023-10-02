import { zodResolver } from '@hookform/resolvers/zod'
import { SelectIcon } from '@radix-ui/react-select'
import { CodeIcon, EditIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useRemoveConfigMutation, useSelectConfigMutation } from '~/apis/mutation'
import { useConfigsQuery, useGetJSONStorageRequest } from '~/apis/query'
import { CodeBlock } from '~/components/CodeBlock'
import { TagsInput } from '~/components/TagsInput'
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
import { ScrollArea } from '~/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { cn } from '~/lib/ui'
import {
  TLSImplementation,
  TcpCheckHttpMethod,
  UTLSImitate,
  configFormDefault,
  configFormSchema
} from '~/schemas/config'

export const ConfigPage = () => {
  const { t } = useTranslation()
  const form = useForm<z.infer<typeof configFormSchema>>({
    resolver: zodResolver(configFormSchema),
    defaultValues: configFormDefault
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <CodeIcon className="w-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent size="large">
                  <DialogHeader>
                    <DialogTitle className="uppercase">{config.name}</DialogTitle>
                  </DialogHeader>

                  <CodeBlock language="json">{JSON.stringify(config, null, 2)}</CodeBlock>
                </DialogContent>
              </Dialog>

              <Dialog open={editDialogOpened} onOpenChange={setEditDialogOpened}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <EditIcon className="w-4" />
                    {t('actions.edit')}
                  </Button>
                </DialogTrigger>

                <DialogContent size="large">
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

                                      <Select value={field.value} onValueChange={field.onChange}>
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
                              <div className="space-y-4">
                                <FormField
                                  name="autoConfigKernelParameter"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.autoConfigKernelParameter')}</FormLabel>

                                      <FormDescription>
                                        {t('form.descriptions.autoConfigKernelParameter')}
                                      </FormDescription>

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

                          <AccordionItem value="node-connectivity-check">
                            <AccordionTrigger>{t('primitives.nodeConnectivityCheck')}</AccordionTrigger>

                            <AccordionContent>
                              <div className="space-y-4">
                                <FormField
                                  name="tcpCheckUrl"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.tcpCheckUrl')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.tcpCheckUrl')}</FormDescription>

                                      <FormControl>
                                        <TagsInput value={field.value} onChange={field.onChange} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="tcpCheckHttpMethod"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.tcpCheckHttpMethod')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.tcpCheckHttpMethod')}</FormDescription>

                                      <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                          {Object.values(TcpCheckHttpMethod).map((tcpCheckHttpMethod) => (
                                            <SelectItem key={tcpCheckHttpMethod} value={tcpCheckHttpMethod}>
                                              {tcpCheckHttpMethod}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="udpCheckDns"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.udpCheckDns')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.udpCheckDns')}</FormDescription>

                                      <FormControl>
                                        <TagsInput tags={field.value} onChange={field.onChange} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="checkIntervalSeconds"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        {t('form.fields.checkInterval')} ({t('primitives.second')})
                                      </FormLabel>

                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="checkToleranceMS"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        {t('form.fields.checkTolerance')} ({t('primitives.millisecond')})
                                      </FormLabel>

                                      <FormDescription>{t('form.descriptions.checkTolerance')}</FormDescription>

                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="connectiing-options">
                            <AccordionTrigger>{t('primitives.connectingOptions')}</AccordionTrigger>

                            <AccordionContent>
                              <div className="space-y-4">
                                <FormField
                                  name="dialMode"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.dialMode')}</FormLabel>

                                      <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                          <SelectItem value="ip">ip</SelectItem>
                                          <SelectItem value="domain">domain</SelectItem>
                                          <SelectItem value="domain+">domain+</SelectItem>
                                          <SelectItem value="domain++">domain++</SelectItem>
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="allowInsecure"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.allowInsecure')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.allowInsecure')}</FormDescription>

                                      <Switch checked={field.value} onCheckedChange={field.onChange} />

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="sniffingTimeoutMS"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        {t('form.fields.sniffingTimeout')} ({t('primitives.millisecond')})
                                      </FormLabel>

                                      <FormDescription>{t('form.descriptions.sniffingTimeout')}</FormDescription>

                                      <Input type="number" {...field} />

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="tlsImplementation"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('form.fields.tlsImplementation')}</FormLabel>

                                      <FormDescription>{t('form.descriptions.tlsImplementation')}</FormDescription>

                                      <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                          {Object.values(TLSImplementation).map((tlsImplementation) => (
                                            <SelectItem key={tlsImplementation} value={tlsImplementation}>
                                              {tlsImplementation}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                {form.getValues('tlsImplementation') === TLSImplementation.utls && (
                                  <FormField
                                    name="utlsImitate"
                                    control={form.control}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{t('form.fields.utlsImitate')}</FormLabel>

                                        <FormDescription>{t('form.descriptions.utlsImitate')}</FormDescription>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                          </FormControl>

                                          <SelectContent>
                                            <ScrollArea className="h-64">
                                              {Object.values(UTLSImitate).map((utlsImitate) => (
                                                <SelectItem key={utlsImitate} value={utlsImitate}>
                                                  {utlsImitate}
                                                </SelectItem>
                                              ))}
                                            </ScrollArea>
                                          </SelectContent>
                                        </Select>

                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                )}
                              </div>
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

              {!isDefault(config.id) && (
                <Button
                  variant="destructive"
                  className="gap-2"
                  icon={<Trash2Icon className="w-4" />}
                  disabled={config.selected}
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
