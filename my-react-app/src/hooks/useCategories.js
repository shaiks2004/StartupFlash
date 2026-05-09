import { useEffect, useState } from "react"
import { getCategories } from "../services/api"

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError("")
        const data = await getCategories()

        if (isMounted) {
          setCategories(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load categories")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCategories()

    return () => {
      isMounted = false
    }
  }, [])

  return { categories, loading, error }
}
