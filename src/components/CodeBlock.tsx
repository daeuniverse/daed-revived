import { FC } from 'react'
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useTheme } from '~/components/ui/theme-provider'

export const CodeBlock: FC<{ children: string } & SyntaxHighlighterProps> = ({ children, ...props }) => {
  const { resolvedTheme } = useTheme()

  return (
    <SyntaxHighlighter style={resolvedTheme === 'dark' ? atomOneDark : atomOneLight} {...props}>
      {children}
    </SyntaxHighlighter>
  )
}
