import { EditorProps } from '@monaco-editor/react'

export const themeDark = 'vs-dark'
export const themeLight = 'githubLight'

export const options: EditorProps['options'] = {
  fontSize: 14,
  fontWeight: 'bold',
  fontFamily: 'Source Code Pro',
  'semanticHighlighting.enabled': true,
  lineHeight: 1.6,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  renderWhitespace: 'selection',
  cursorBlinking: 'solid',
  formatOnPaste: true,
  insertSpaces: true,
  tabSize: 2,
  lineNumbers: 'off',
  padding: { top: 8, bottom: 8 }
}
