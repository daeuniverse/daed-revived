import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { ListInput } from '~/components/ListInput'
import { TagsInput, TagsInputOption } from '~/components/TagsInput'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'

const books: TagsInputOption[] = [
  { value: 'book-1', description: 'Harper Lee', title: 'To Kill a Mockingbird' },
  { value: 'book-2', description: 'Lev Tolstoy', title: 'War and Peace' },
  { value: 'book-3', description: 'Fyodor Dostoyevsy', title: 'The Idiot' },
  { value: 'book-4', description: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
  { value: 'book-5', description: 'George Orwell', title: '1984' },
  { value: 'book-6', description: 'Jane Austen', title: 'Pride and Prejudice' },
  { value: 'book-7', description: 'Marcus Aurelius', title: 'Meditations' },
  { value: 'book-8', description: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov' },
  { value: 'book-9', description: 'Lev Tolstoy', title: 'Anna Karenina' },
  { value: 'book-10', description: 'Fyodor Dostoevsky', title: 'Crime and Punishment' }
]

export const OrchestratePage = () => {
  const { t } = useTranslation()
  const schema = z.object({
    books: z.array(z.string().nonempty()).nonempty(),
    authors: z.array(z.string().nonempty()).nonempty()
  })
  const form = useForm<z.infer<typeof schema>>({
    shouldFocusError: true,
    resolver: zodResolver(schema),
    defaultValues: {
      books: ['book-1', 'book-2'],
      authors: ['author-1', 'author-2']
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            console.log(values)
          })}
        >
          <FormField
            name="books"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>books</FormLabel>

                <FormControl>
                  <TagsInput options={books} placeholder="Select a book" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="authors"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>authors</FormLabel>

                <FormControl>
                  <ListInput name={field.name} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t('actions.submit')}</Button>
        </form>
      </Form>
    </div>
  )
}
