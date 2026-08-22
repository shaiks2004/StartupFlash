const PRODUCTION_SITE_URL = "https://thestartupflash.in"

const normalizeSiteUrl = (value) => String(value || "").trim().replace(/\/+$/, "")

export const SITE_URL = import.meta.env.PROD
  ? normalizeSiteUrl(import.meta.env.VITE_SITE_URL) || PRODUCTION_SITE_URL
  : normalizeSiteUrl(import.meta.env.VITE_SITE_URL) || (
    typeof window !== "undefined" ? window.location.origin : PRODUCTION_SITE_URL
  )

export const getPageUrl = (pathname = "/") => {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `${SITE_URL}${normalizedPath}`
}
