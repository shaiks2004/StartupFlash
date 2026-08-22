import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useSearch } from "../hooks/useSearch"
import ArticleCard from "../components/ArticleCard"
import LoadingSkeleton from "../components/LoadingSkeleton"
import "../styles/pages/search.css"
import "../styles/components/card-utilities.css"

const useQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function SearchPage() {
  const query = useQuery()
  const term = query.get("q") || ""
  const { results, loading, error } = useSearch(term, { per_page: 12 })

  return (
    <section className="search-page">
      <Helmet>
        <title>Search | StartupFlash</title>
        <meta name="description" content="Search StartupFlash articles." />
      </Helmet>

      <div className="page-header">
        <div>
          <p>SEARCH</p>
          <h1>{term ? `Results for "${term}"` : "Search"}</h1>
        </div>
      </div>

      {loading && <LoadingSkeleton lines={4} />}
      {error && <p className="error-text">{error}</p>}

      <div className="feed-grid">
        {results.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {!loading && term && results.length === 0 && (
        <p className="error-text">No stories matched your search.</p>
      )}
    </section>
  )
}

export default SearchPage
