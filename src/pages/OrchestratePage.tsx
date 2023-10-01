import { TagsInput } from '~/components/TagsInput'

export const OrchestratePage = () => {
  return (
    <TagsInput
      defaultTags={['hello', 'hello', 'world']}
      onChange={(tags) => {
        console.log(tags)
      }}
    />
  )
}
