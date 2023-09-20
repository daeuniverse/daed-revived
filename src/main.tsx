/* @refresh reload */
import '~/index.css'

import { Router, hashIntegration } from '@solidjs/router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import { render } from 'solid-js/web'
import { App } from '~/App'
import { GraphqlClientProvider } from '~/apis'

dayjs.extend(relativeTime)

render(
  () => (
    <GraphqlClientProvider>
      <Router source={hashIntegration()}>
        <App />
      </Router>
    </GraphqlClientProvider>
  ),
  document.getElementById('root')!,
)
