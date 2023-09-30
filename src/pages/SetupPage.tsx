import { zodResolver } from '@hookform/resolvers/zod'
import { gql } from 'graphql-request'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { TokenQuery } from '~/apis/gql/graphql'
import { endpointInfoAtom } from '~/atoms'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { toast } from '~/components/ui/use-toast'
import { useGraphqlClient } from '~/contexts'

export const SetupPage = () => {
  const { t } = useTranslation()
  const [, setEndpointInfo] = useAtom(endpointInfoAtom)
  const graphqlClient = useGraphqlClient()
  const navigate = useNavigate()

  const formSchema = z.object({
    endpointURL: z.string().url().nonempty(),
    username: z.string().min(4).max(20),
    password: z.string().min(6).max(20)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { endpointURL: '', username: '', password: '' }
  })

  return (
    <div className="mx-auto w-full max-w-md space-y-12 pt-20">
      <h1 className="text-center text-2xl font-bold">Welcome to daed</h1>

      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(async ({ endpointURL, username, password }) => {
            graphqlClient.setEndpoint(endpointURL)

            try {
              const { token } = await graphqlClient.request<TokenQuery>(
                gql`
                  query Token($username: String!, $password: String!) {
                    token(username: $username, password: $password)
                  }
                `,
                {
                  username,
                  password
                }
              )

              setEndpointInfo({ endpointURL, token })

              navigate('/')
            } catch (err) {
              toast({ description: (err as Error).message })
            }
          })}
        >
          <FormField
            name="endpointURL"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.fields.endpointURL')}</FormLabel>

                <FormControl>
                  <Input type="url" placeholder="http://127.0.0.1:2023/graphql" {...field} />
                </FormControl>

                <FormDescription>
                  {t('form.descriptions.pleaseEnter', {
                    fieldName: t('form.fields.endpointURL')
                  })}
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.fields.username')}</FormLabel>

                <FormControl>
                  <Input type="text" placeholder="daed" {...field} />
                </FormControl>

                <FormDescription>
                  {t('form.descriptions.pleaseEnter', {
                    fieldName: t('form.fields.username')
                  })}
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button className="w-full" type="submit" loading={form.formState.isSubmitting}>
            {t('actions.login')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
