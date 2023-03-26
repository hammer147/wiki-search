import getWikiResults from '@/lib/getWikiResults'
import WikiPage from './components/wiki-page'

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMeta({ params: { searchTerm } }: Props) {
  const wikiResults = await getWikiResults(searchTerm)
  const displayTerm = searchTerm.replaceAll('%20', ' ') // todo: replace with decodeURI or decodeURIComponent()

  if (!wikiResults) return { title: 'Server Error' }
  if (!wikiResults.success) return { title: 'Search Error' }
  if (!wikiResults?.data?.query?.pages?.length) return { title: `No Results for ${displayTerm}` }

  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  const wikiResults = await getWikiResults(searchTerm)
  const displayTerm = searchTerm.replaceAll('%20', ' ') // todo: replace with decodeURI or decodeURIComponent()

  if (!wikiResults) return <div>Server Error</div>
  if (!wikiResults.success) return <div>Search Error</div>
  if (!wikiResults?.data?.query?.pages?.length) return <div>{`No Results for ${displayTerm}`}</div>

  return (
    <main>
      {wikiResults.data.query.pages.map(page => (
        <WikiPage key={page.pageid} page={page}/>
      ))}
    </main>
  )
}
