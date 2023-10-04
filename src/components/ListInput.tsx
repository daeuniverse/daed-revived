import { PlusIcon, XIcon } from 'lucide-react'
import { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

const ListInput: FC<{ name: string }> = ({ name }) => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({ name, control: form.control })

  return (
    <div className="flex flex-col gap-2">
      {fields.map((item, index) => {
        return (
          <FormField
            key={item.id}
            name={`${name}.${index}`}
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <Input {...field} />

                  <Button variant="destructive" size="icon" onClick={() => remove(index)}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        )
      })}

      <Button onClick={() => append('')}>
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
ListInput.displayName = 'ListInput'

export { ListInput }
