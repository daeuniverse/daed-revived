import { Route, Routes } from '@solidjs/router'
import { Show } from 'solid-js'
import { endpoint } from '~/apis'
import { Header } from '~/components'
import { Home, Setup } from '~/pages'

export const App = () => {
  return (
    <div
      class="relative flex h-screen flex-col px-2 subpixel-antialiased"
      data-theme="synthwave"
    >
      {/* sticky positioned header */}
      <Header />

      <div class="overflow-y-scroll p-2">
        <Routes>
          <Route path="/setup" component={Setup} />

          {/* protected resources */}
          <Show when={endpoint()}>
            <Route path="/" component={Home} />
          </Show>
        </Routes>
      </div>
    </div>
  )
}
