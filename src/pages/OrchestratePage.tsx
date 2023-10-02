import { useState } from 'react'
import { TagsInput, TagsInputOption } from '~/components/TagsInput'

const books: TagsInputOption[] = [
  { value: 'book-1', description: 'Harper Lee', title: 'To Kill a Mockingbird' },
  { value: 'book-2', description: 'Lev Tolstoy', title: 'War and Peace' },
  { value: 'book-3', description: 'Fyodor Dostoyevsy', title: 'The Idiot' },
  { value: 'book-4', description: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
  { value: 'book-5', description: 'George Orwell', title: '1984' },
  { value: 'book-6', description: 'Jane Austen', title: 'Pride and Prejudice' },
  { value: 'book-7', description: 'Marcus Aurelius', title: 'Meditations' },
  { value: 'book-8', description: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov' },
  { value: 'book-9', description: 'Lev Tolstoy', title: 'Anna Karenina' },
  { value: 'book-10', description: 'Fyodor Dostoevsky', title: 'Crime and Punishment' }
]

export const OrchestratePage = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="flex flex-col gap-4">
      <TagsInput options={books} placeholder="Select a book" value={value} onChange={(value) => setValue(value)} />
    </div>
  )
}
