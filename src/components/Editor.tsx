import { Editor as BaseEditor, EditorProps } from '@monaco-editor/react'
import { FC } from 'react'
import { useResolvedTheme } from '~/components/ui/theme-provider'
import { options, themeDark, themeLight } from '~/editor/options'

export const Editor: FC<EditorProps> = (props) => {
  const theme = useResolvedTheme()

  return (
    <BaseEditor
      theme={theme === 'dark' ? themeDark : themeLight}
      options={options}
      {...props}
    />
  )
}
