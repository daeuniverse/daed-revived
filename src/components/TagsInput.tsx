import { flip, FloatingPortal, offset, useFloating } from '@floating-ui/react'
import { useSize } from 'ahooks'
import { useCombobox, useMultipleSelection } from 'downshift'
import { differenceWith } from 'lodash'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { matchSorter } from 'match-sorter'
import { forwardRef, HTMLAttributes, useMemo, useRef, useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/ui'

type TagsInputOption = {
  value: string
  title: string
  description: string
}

type TagsInputProps = {
  options?: TagsInputOption[]
  value?: TagsInputOption['value'][]
  onChange?: (value: TagsInputOption['value'][]) => void
  placeholder?: string
} & HTMLAttributes<HTMLInputElement>

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ options = [], value = [], onChange, placeholder, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('')

    const items = useMemo(
      () =>
        matchSorter(
          differenceWith(options, value, (a, b) => a.value === b),
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
                onChange?.([...value, newSelectedItem.value])
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

    const open = !!(isOpen && items.length)

    const portalRef = useRef<HTMLDivElement>(null)
    const portalSize = useSize(portalRef)

    const { refs, floatingStyles } = useFloating({
      placement: 'bottom-start',
      middleware: [offset(10), flip()]
    })

    return (
      <div ref={refs.setReference}>
        <div
          ref={portalRef}
          className="inline-flex w-full flex-wrap items-center gap-2 rounded-md border bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
        >
          {value.map((selectedValue, index) => (
            <Badge
              key={index}
              className="gap-0.5 ring-offset-background"
              {...getSelectedItemProps({
                selectedItem: selectedValue,
                index
              })}
            >
              {options.find((option) => option.value === selectedValue)?.title}

              <button
                type="button"
                className="rounded-full outline-none ring-0 ring-offset-transparent transition-colors hover:bg-transparent/30 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
                onClick={(e) => {
                  e.stopPropagation()
                  removeSelectedItem(selectedValue)
                }}
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          <div className="flex flex-1 grow gap-2">
            <input
              ref={ref}
              className="min-w-[2rem] flex-1 bg-inherit text-sm outline-0 ring-0 placeholder:text-muted-foreground"
              placeholder={placeholder}
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
              {...props}
            />

            <Button type="button" variant="secondary" className="h-fit w-fit p-1" {...getToggleButtonProps()}>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={cn(open && 'hidden')} {...getMenuProps()}>
          {open && (
            <FloatingPortal>
              <ul
                ref={refs.setFloating}
                className="z-[100] max-h-64 overflow-y-auto rounded bg-background"
                style={{ width: portalSize?.width, ...floatingStyles }}
              >
                {items.map((item, index) => (
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
            </FloatingPortal>
          )}
        </div>
      </div>
    )
  }
)
TagsInput.displayName = 'TagsInput'

export type { TagsInputOption, TagsInputProps }

export { TagsInput }
