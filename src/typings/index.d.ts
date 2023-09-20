declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      [name: string]: unknown
    }
  }
}

// backend endpoint url and credentials after the setup step
export type Endpoint = {
  url: string
  token: string
}
