const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL

const cache = new Map()
const DEFAULT_TTL_MS = 60 * 1000
const DEFAULT_TIMEOUT_MS = 12000

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
  const requestParams = path.startsWith("/posts")
    ? { ...params, _embed: 1 }
    : params
  const query = buildQuery(requestParams)
  const url = `${API_BASE_URL}${path}${query ? `?${query}` : ""}`
  const cacheKey = url
  const now = Date.now()

  const cached = cache.get(cacheKey)
  if (cached && now - cached.timestamp < (options.ttlMs || DEFAULT_TTL_MS)) {
    return cached.data
  }
  const controller = new AbortController()
  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  let response
  try {
    response = await fetch(url, { signal: controller.signal })
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out")
    }

    throw new Error("Network request failed")
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error("Invalid server response")
  }

  if (!Array.isArray(data) && typeof data !== "object") {
    throw new Error("Invalid server response")
  }

  cache.set(cacheKey, { data, timestamp: now })
  return data
}

const postJson = async (path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data.error || data.details || `Request failed: ${response.status}`)
    error.status = response.status
    throw error
  }

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

export const subscribeToNewsletter = (email) =>
  postJson("/newsletter", { email })

export const submitFeaturedSubmission = (submission) =>
  postJson("/get-featured", submission)
