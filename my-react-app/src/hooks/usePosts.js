import { useEffect, useMemo, useState } from "react"
import { getPosts } from "../services/api"

const DEFAULT_PER_PAGE = 9

export const usePosts = (params = {}) => {
  const { enabled = true, ...queryBase } = params
  const initialPage = params.page || 1
  const perPage = params.per_page || DEFAULT_PER_PAGE

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasMore, setHasMore] = useState(true)

  const paramsKey = useMemo(() => JSON.stringify(queryBase), [queryBase])

  const queryParams = useMemo(
    () => ({ ...queryBase, page, per_page: perPage }),
    [paramsKey, page, perPage]
  )

  useEffect(() => {
    setPage(initialPage)
  }, [paramsKey, initialPage])

  useEffect(() => {
    let isMounted = true

    const fetchPosts = async () => {
      if (!enabled) {
        setPosts([])
        setHasMore(false)
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        setError("")

        if (import.meta.env.DEV) {
          console.log("usePosts params", queryParams)
        }

        const data = await getPosts(queryParams)

        if (import.meta.env.DEV) {
          console.log("usePosts response", data)
        }

        if (!isMounted) {
          return
        }

        if (page === initialPage) {
          setPosts(data)
        } else {
          setPosts((prev) => [...prev, ...data])
        }

        setHasMore(Array.isArray(data) && data.length === perPage)
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load posts")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPosts()

    return () => {
      isMounted = false
    }
  }, [queryParams, page, perPage, initialPage])

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }

  const reset = () => {
    setPage(initialPage)
  }

  return { posts, loading, error, hasMore, loadMore, reset, page }
}
