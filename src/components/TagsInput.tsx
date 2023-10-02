import { useUpdateEffect } from 'ahooks'
import { XIcon } from 'lucide-react'
import { FC, useMemo } from 'react'
import { Badge } from '~/components/ui/badge'

export const TagsInput: FC<{
  tags?: string[]
  separators?: string[]
  onChange?: (tags: string[]) => unknown
}> = ({ tags = [], separators: separatorsProp = [], onChange }) => {
  const separators = useMemo(
    () => ['enter', ...separatorsProp].map((separator) => separator.toLowerCase()),
    [separatorsProp]
  )

  useUpdateEffect(() => {
    onChange?.(tags)
  }, [onChange, tags])

  return (
    <div className="flex flex-wrap items-center gap-2 rounded border p-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      {tags.map((value, index) => (
        <Badge key={index} className="gap-0.5 ring-offset-background">
          {value}

          <button
            className="rounded-full outline-none ring-0 ring-offset-transparent transition-colors hover:bg-transparent/30 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
            onClick={() => onChange?.(tags.filter((tag) => tag !== value))}
          >
            <XIcon className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      <input
        className="min-w-[2rem] flex-1 bg-inherit outline-0 ring-0"
        onKeyDown={(e) => {
          const value = e.currentTarget.value

          if (value && separators.includes(e.key.toLowerCase())) {
            e.preventDefault()

            if (tags.includes(value)) return

            onChange?.([...tags, value])
            e.currentTarget.value = ''
          }

          if (!value && e.key.toLowerCase().includes('backspace')) {
            onChange?.(tags.slice(0, -1))
          }
        }}
      />
    </div>
  )
}
