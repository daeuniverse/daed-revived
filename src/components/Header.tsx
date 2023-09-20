import { A, useNavigate } from '@solidjs/router'
import { Show } from 'solid-js'
import { endpoint, setEndpoint } from '~/apis'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <A class="btn btn-ghost text-xl normal-case" href="/">
          daed
        </A>
      </div>

      <div class="navbar-center">
        <ul class="menu menu-horizontal">
          <li>
            <a>Item 1</a>
          </li>

          <li>
            <a>Item 2</a>
          </li>

          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <Show
          when={endpoint()}
          fallback={
            <button
              class="btn"
              onClick={() => {
                navigate('/setup')
              }}
            >
              Setup
            </button>
          }
        >
          <button
            class="btn"
            onClick={() => {
              setEndpoint()

              navigate('/setup')
            }}
          >
            Logout
          </button>
        </Show>
      </div>
    </div>
  )
}
