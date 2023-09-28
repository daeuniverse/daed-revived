import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { routingA } from '~/editor/languages'

export const initializeEditor = async () => {
  loader.config({ monaco })

  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new jsonWorker()
      }

      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker()
      }

      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker()
      }

      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker()
      }

      return new editorWorker()
    }
  }

  const monacoInstance = await loader.init()

  monacoInstance.languages.register({ id: 'routingA', extensions: ['dae'] })
  monacoInstance.languages.setMonarchTokensProvider('routingA', routingA)

  const themeGithub = await import('monaco-themes/themes/GitHub.json')
  const themeGithubLight = await import(
    'monaco-themes/themes/GitHub Light.json'
  )
  monacoInstance.editor.defineTheme(
    'github',
    themeGithub as monaco.editor.IStandaloneThemeData
  )
  monacoInstance.editor.defineTheme(
    'githubLight',
    themeGithubLight as monaco.editor.IStandaloneThemeData
  )
}
