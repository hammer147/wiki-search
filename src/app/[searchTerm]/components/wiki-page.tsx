import { Result } from '@/types'

import Link from 'next/link'

type Props = {
  page: Result
}

export default function WikiPage({ page }: Props) {
  const itemTextCol = (
    <div className='flex flex-col justify-center'>
      <h2>
        <Link
          href={`https://en.wikipedia.org/?curid=${page.pageid}`}
          target='_blank'
          className='text-xl font-bold underline'>
          {page.title}
        </Link>
      </h2>
      <p>{page.extract}</p>
    </div>
  )

  const content = page?.thumbnail?.source ? (
    <article className='m-4 max-w-lg'>
      <div className='flex flex-row gap-4'>
        <div className='flex flex-col justify-center'>
          <img
            src={page.thumbnail.source}
            alt={page.title}
            width={page.thumbnail.width}
            height={page.thumbnail.height}
            loading='lazy'
          />
        </div>
        {itemTextCol}
      </div>
    </article>
  ) : (
    <article className='m-4 max-w-lg'>{itemTextCol}</article>
  )

  return content
}
