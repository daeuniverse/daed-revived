import { Route, Routes } from '@solidjs/router'
import { Setup } from '~/pages'

export const App = () => {
  return (
    <Routes>
      <Route path="/setup" component={Setup} />
      <Route path="*" element={<div>daed revived</div>} />
    </Routes>
  )
}
