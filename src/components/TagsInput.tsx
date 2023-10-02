import { useCombobox, useMultipleSelection } from 'downshift'
import { differenceWith } from 'lodash'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { matchSorter } from 'match-sorter'
import { FC, useMemo, useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/ui'

export type TagsInputOption = {
  value: string
  title: string
  description: string
}

export type TagsInputProps = {
  options: TagsInputOption[]
  value?: TagsInputOption[]
  onChange?: (value: TagsInputOption[]) => void
  placeholder?: string
}

export const TagsInput: FC<TagsInputProps> = ({
  options,
  value = [] as unknown as TagsInputOption[],
  onChange,
  placeholder
}) => {
  const [inputValue, setInputValue] = useState('')

  const items = useMemo(
    () =>
      matchSorter(
        differenceWith(options, value, (a, b) => a.value === b.value),
        inputValue,
        {
          keys: ['title', 'description']
        }
      ),
    [inputValue, value, options]
  )

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems: value,

    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          newSelectedItems && onChange?.(newSelectedItems)

          break
        default:
          break
      }
    }
  })

  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } =
    useCombobox({
      items,
      itemToString: (item) => (item ? item.title : ''),
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      selectedItem: null,
      inputValue,

      stateReducer(_state, actionAndChanges) {
        const { changes, type } = actionAndChanges

        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return { ...changes, isOpen: true, highlightedIndex: 0 }

          default:
            return changes
        }
      },

      onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            if (newSelectedItem) {
              onChange?.([...value, newSelectedItem])
              setInputValue('')
            }

            break

          case useCombobox.stateChangeTypes.InputChange:
            setInputValue(newInputValue || '')

            break

          default:
            break
        }
      }
    })

  return (
    <div className="relative">
      <div className="inline-flex w-full flex-wrap items-center gap-2 rounded border bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
        {value.map((selectedItemForRender, index) => (
          <Badge
            key={index}
            className="gap-0.5 ring-offset-background"
            {...getSelectedItemProps({
              selectedItem: selectedItemForRender,
              index
            })}
          >
            {selectedItemForRender.title}

            <button
              className="rounded-full outline-none ring-0 ring-offset-transparent transition-colors hover:bg-transparent/30 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={(e) => {
                e.stopPropagation()
                removeSelectedItem(selectedItemForRender)
              }}
            >
              <XIcon className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <div className="flex flex-1 grow gap-2">
          <input
            className="min-w-[2rem] flex-1 bg-inherit text-sm outline-0 ring-0 placeholder:text-muted-foreground"
            placeholder={placeholder}
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />

          <Button variant="secondary" className="h-fit w-fit p-1" {...getToggleButtonProps()}>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ul
        className={cn(
          !(isOpen && items.length) && 'hidden',
          'absolute inset-x-0 z-10 mt-2 max-h-80 overflow-y-auto rounded bg-background'
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={index}
              className={cn(
                highlightedIndex === index && 'bg-accent',
                selectedItem === item && 'font-bold',
                'flex flex-col gap-1 p-2'
              )}
              {...getItemProps({ item, index })}
            >
              <span className="text-sm">{item.title}</span>

              <span className="text-xs">{item.description}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
