import { useState } from 'react'
import { TagsInput } from '~/components/TagsInput'

export const OrchestratePage = () => {
  const [tags, setTags] = useState(['hello', 'hello', 'world'])

  return <TagsInput tags={tags} separators={[',', '.']} onChange={(tags) => setTags(tags)} />
}
