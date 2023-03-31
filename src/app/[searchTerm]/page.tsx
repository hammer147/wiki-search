import getWikiResults from '@/lib/getWikiResults'
import WikiPage from './components/wiki-page'

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiResults = await getWikiResults(searchTerm)
  const displayTerm = decodeURIComponent(searchTerm)
  if (!wikiResults) return { title: 'Server Error' }
  if (!wikiResults.success) return { title: 'Search Error' }
  if (
    !wikiResults?.data?.query?.pages ||
    Object.values(wikiResults.data.query.pages).length === 0
  ) {
    return { title: `No Results for ${displayTerm}` }
  }

  return {
    title: displayTerm,
    description: `Search results for: ${displayTerm}`
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  const wikiResults = await getWikiResults(searchTerm)
  const displayTerm = decodeURIComponent(searchTerm)

  if (!wikiResults) return <div>Server Error</div>
  // if (!wikiResults.success) return <div>{wikiResults.error.message}</div>
  if (!wikiResults.success) return <div>Search Error</div>
  if (
    !wikiResults?.data?.query?.pages ||
    Object.values(wikiResults.data.query.pages).length === 0
  ) {
    return <div>{`No results for: ${displayTerm}`}</div>
  }

  return (
    <main>
      {Object.values(wikiResults.data.query.pages).map(page => (
        <WikiPage key={page.pageid} page={page} />
      ))}
    </main>
  )
}
