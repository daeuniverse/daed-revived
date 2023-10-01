import { FC, useState } from 'react'
import { Badge } from '~/components/ui/badge'

export const TagsInput: FC<{ defaultTags?: string[] }> = ({ defaultTags = [] }) => {
  const [tags, setTags] = useState<string[]>(defaultTags)

  return (
    <div className="flex flex-wrap items-center gap-2 rounded border p-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      {tags.map((value, index) => (
        <Badge key={index}>{value}</Badge>
      ))}

      <input
        className="min-w-[2rem] flex-1 bg-inherit outline-0 ring-0"
        onKeyDown={(e) => {
          const value = e.currentTarget.value

          if (value && e.key.toLowerCase().includes('enter')) {
            e.preventDefault()

            if (tags.includes(value)) return

            setTags((tags) => [...tags, value])
            e.currentTarget.value = ''
          }

          if (!value && e.key.toLowerCase().includes('backspace')) {
            setTags(() => tags.slice(0, -1))
          }
        }}
      />
    </div>
  )
}
