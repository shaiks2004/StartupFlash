import { Link, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import { X } from "lucide-react"
import { useDebouncedValue } from "../hooks/useDebouncedValue"
import { useSearch } from "../hooks/useSearch"
import { formatDate } from "../utils/content"

function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("")
  const debounced = useDebouncedValue(query)
  const { results, loading } = useSearch(debounced, { per_page: 6 })
  const navigate = useNavigate()
  const panelRef = useRef(null)
  const lastFocusedRef = useRef(null)

  const suggestions = useMemo(() => results.slice(0, 5), [results])

  useEffect(() => {
    if (!open) {
      return
    }

    lastFocusedRef.current = document.activeElement

    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",")

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return
      }

      const focusable = Array.from(panelRef.current.querySelectorAll(selectors))
      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeydown)
    document.body.style.overflow = "hidden"

    const firstFocusable = panelRef.current?.querySelector("input, button, a")
    firstFocusable?.focus()

    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.body.style.overflow = ""
      lastFocusedRef.current?.focus?.()
    }
  }, [open, onClose])

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
    <div className="search-modal" role="presentation">
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search articles" ref={panelRef}>
        <button className="search-close" onClick={onClose} type="button" aria-label="Close search">
          <X size={18} aria-hidden="true" />
        </button>
        <h3>Search StartupFlash</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search startups, founders, funding..."
            autoFocus
            aria-label="Search query"
          />
        </form>
        <div className="search-suggestions">
          {loading ? (
            <p>Searching...</p>
          ) : suggestions.length === 0 ? (
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
                    __html: post.title?.rendered || "Untitled story"
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
