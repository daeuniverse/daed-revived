declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      [name: string]: unknown
    }
  }
}

export type Endpoint = {
  url: string
  token: string
}
