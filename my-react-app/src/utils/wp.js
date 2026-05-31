const isValidHttpUrl = (value = "") => {
  if (!value) {
    return false
  }

  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()

export const getFeaturedImage = (post) =>
  isValidHttpUrl(post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url)
    ? post._embedded["wp:featuredmedia"][0].source_url
    : ""

export const getAuthorName = (post) =>
  post?._embedded?.author?.[0]?.name || "StartupFlash"

export const getCategoryNames = (post) =>
  post?._embedded?.["wp:term"]?.[0]?.map((term) => term.name) || []

export const getCategorySlugs = (post) =>
  post?._embedded?.["wp:term"]?.[0]?.map((term) => term.slug) || []

export const getCategoryIds = (post) =>
  post?._embedded?.["wp:term"]?.[0]?.map((term) => term.id) || []

export const getPrimaryCategory = (post) =>
  getCategoryNames(post)[0] || "Startup"

export const getExcerpt = (post) =>
  stripHtml(post?.excerpt?.rendered || "")

export const getReadTime = (content = "") => {
  const words = stripHtml(content).split(" ").filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min`
}

export const normalizePost = (post) => ({
  id: post?.id,
  slug: post?.slug,
  title: post?.title?.rendered || "",
  excerpt: getExcerpt(post),
  content: post?.content?.rendered || "",
  date: post?.date,
  author: getAuthorName(post),
  category: getPrimaryCategory(post),
  categories: getCategoryNames(post),
  image: getFeaturedImage(post),
  raw: post
})
