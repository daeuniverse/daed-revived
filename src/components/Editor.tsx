import { Editor as BaseEditor, EditorProps } from '@monaco-editor/react'
import { FC } from 'react'
import { useTheme } from '~/components/ui/theme-provider'
import { options, themeDark, themeLight } from '~/editor/options'

export const Editor: FC<EditorProps> = (props) => {
  const { resolvedTheme } = useTheme()

  return <BaseEditor theme={resolvedTheme === 'dark' ? themeDark : themeLight} options={options} {...props} />
}
