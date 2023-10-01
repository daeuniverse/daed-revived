import { TagsInput } from '~/components/TagsInput'

export const OrchestratePage = () => {
  return (
    <TagsInput defaultTags={['hello', 'hello', 'world']} separators={[',']} onChange={(tags) => console.log(tags)} />
  )
}
