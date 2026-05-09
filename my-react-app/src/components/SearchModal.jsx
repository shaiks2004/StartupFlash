import { Link, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { useDebouncedValue } from "../hooks/useDebouncedValue"
import { useSearch } from "../hooks/useSearch"
import { formatDate } from "../utils/content"

function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("")
  const debounced = useDebouncedValue(query)
  const { results } = useSearch(debounced, { per_page: 6 })
  const navigate = useNavigate()

  const suggestions = useMemo(() => results.slice(0, 5), [results])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!query.trim()) {
      return
    }
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  if (!open) {
    return null
  }

  return (
    <div className="search-modal">
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel" role="dialog" aria-modal="true">
        <button className="search-close" onClick={onClose}>
          ✕
        </button>
        <h3>Search StartupFlash</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search startups, founders, funding..."
            autoFocus
          />
        </form>
        <div className="search-suggestions">
          {suggestions.length === 0 ? (
            <p>No results yet. Try a keyword.</p>
          ) : (
            suggestions.map((post) => (
              <Link
                key={post.id}
                to={`/article/${post.slug}`}
                onClick={onClose}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: post.title?.rendered || ""
                  }}
                />
                <em>{formatDate(post.date)}</em>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
