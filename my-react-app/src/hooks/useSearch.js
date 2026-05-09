import { useEffect, useState } from "react"
import { searchPosts } from "../services/api"

export const useSearch = (query, params = {}) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    let isMounted = true

    const fetchResults = async () => {
      if (!query) {
        setResults([])
        return
      }

      try {
        setLoading(true)
        setError("")
        const data = await searchPosts(query, params)
        if (isMounted) {
          setResults(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to search")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchResults()

    return () => {
      isMounted = false
    }
  }, [query, paramsKey])

  return { results, loading, error }
}
