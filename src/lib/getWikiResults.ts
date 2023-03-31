import { searchResultSchema } from '@/types'

export default async function getWikiResults(searchTerm: string) {

  const searchParams = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: searchTerm,
      gsrlimit: '20',
      prop: 'pageimages|extracts',
      exchars: '100',
      exintro: 'true',
      explaintext: 'true',
      exlimit: 'max',
      format: 'json',
      origin: '*',
  })

  // console.log('https://en.wikipedia.org/w/api.php?' + searchParams)

  const response = await fetch('https://en.wikipedia.org/w/api.php?' + searchParams)
  if (!response.ok) return undefined
  const data = await response.json()
  // console.log(data)
  const result = searchResultSchema.safeParse(data)
  return result // Promise<{ success: true, data: SearchResult } | { success: false, error: ZodError }>
}
