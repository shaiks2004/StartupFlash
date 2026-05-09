const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

const cache = new Map()
const DEFAULT_TTL_MS = 60 * 1000

const buildQuery = (params = {}) => {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item))
      return
    }

    query.set(key, value)
  })

  return query.toString()
}

const fetchJson = async (path, params, options = {}) => {
  const query = buildQuery(params)
  const url = `${API_BASE_URL}${path}${query ? `?${query}` : ""}`
  const cacheKey = url
  const now = Date.now()

  if (import.meta.env.DEV) {
    console.log("fetchJson", url)
  }

  const cached = cache.get(cacheKey)
  if (cached && now - cached.timestamp < (options.ttlMs || DEFAULT_TTL_MS)) {
    return cached.data
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  const data = await response.json()
  cache.set(cacheKey, { data, timestamp: now })
  return data
}

export const getPosts = (params) => fetchJson("/posts", params)

export const getPostById = (id) => fetchJson(`/posts/${id}`)

export const getPostBySlug = async (slug) => {
  const data = await fetchJson("/posts", { slug })
  return data && data.length ? data[0] : null
}

export const getCategories = () => fetchJson("/categories")

export const getPostsByCategory = (categoryId, params = {}) =>
  fetchJson("/posts", { categories: categoryId, ...params })

export const searchPosts = (query, params = {}) =>
  fetchJson("/posts", { search: query, ...params })
