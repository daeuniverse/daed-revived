import { autoUpdate, flip, FloatingPortal, offset, useFloating } from '@floating-ui/react'
import { useSize } from 'ahooks'
import { useCombobox, useMultipleSelection } from 'downshift'
import { differenceWith } from 'lodash'
import { ChevronDownIcon, ChevronUpIcon, XIcon } from 'lucide-react'
import { matchSorter } from 'match-sorter'
import { forwardRef, HTMLAttributes, ReactNode, useMemo, useRef, useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/ui'

export type TagsInputOption = {
  value: string
  title?: string
  description?: ReactNode
}

export type TagsInputProps = {
  options?: TagsInputOption[]
  value?: TagsInputOption['value'][]
  onChange?: (value: TagsInputOption['value'][]) => void
} & Omit<HTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ options = [], value = [], onChange, placeholder, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('')

    const items = useMemo(
      () =>
        matchSorter(
          differenceWith(options, value, (option, b) => option.value === b),
          inputValue,
          { sorter: (rankedItems) => rankedItems, keys: ['title', 'description'] }
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

    const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps } = useCombobox({
      items,
      itemToString: (item) => (item?.title ? item.title : ''),
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
      whileElementsMounted: autoUpdate,
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
              className="gap-1 ring-offset-background"
              {...getSelectedItemProps({ selectedItem: selectedValue, index })}
            >
              {options.find((option) => option.value === selectedValue)?.title || selectedValue}

              <Button
                variant="ghost"
                size="icon"
                className="h-auto w-auto"
                onClick={(e) => {
                  e.stopPropagation()

                  removeSelectedItem(selectedValue)
                }}
              >
                <XIcon className="h-3 w-3" />
              </Button>
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

            <Button variant="secondary" className="h-fit w-fit p-1" {...getToggleButtonProps()}>
              {open ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
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
                    className={cn(highlightedIndex === index && 'bg-accent ', 'flex flex-col gap-1 p-2')}
                    {...getItemProps({ item, index })}
                  >
                    <span className={cn(highlightedIndex === index && 'font-bold', 'text-sm')}>
                      {item.title || item.value}
                    </span>

                    {item.description && <span className="text-xs">{item.description}</span>}
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

export { TagsInput }
