import { userQuery } from '~/apis'

export const Home = () => {
  const [user] = userQuery()

  return (
    <div class="flex flex-col gap-4">
      <code>
        <pre class="whitespace-pre-wrap break-all">
          {JSON.stringify(user(), null, 2)}
        </pre>
      </code>
    </div>
  )
}
