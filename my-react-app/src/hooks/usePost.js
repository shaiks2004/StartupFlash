import { useEffect, useState } from "react"
import { getPostById, getPostBySlug } from "../services/api"

export const usePost = ({ id, slug }) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const fetchPost = async () => {
      try {
        setLoading(true)
        setError("")

        const data = id ? await getPostById(id) : await getPostBySlug(slug)

        if (isMounted) {
          setPost(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load post")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (id || slug) {
      fetchPost()
    }

    return () => {
      isMounted = false
    }
  }, [id, slug])

  return { post, loading, error }
}
