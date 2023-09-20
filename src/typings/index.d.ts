declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      [name: string]: unknown
    }
  }
}

export * from './graphql'
