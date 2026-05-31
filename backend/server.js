const path = require("path")
require("dotenv").config()
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()

const CORS_ORIGIN = process.env.CORS_ORIGIN || ""
const allowedOrigins = CORS_ORIGIN
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error("Not allowed by CORS"))
  }
}))
app.use(express.json())

/* ===================================
   ENV VARIABLES
=================================== */

const WORDPRESS_URL =
  process.env.WP_BASE_URL || "https://thestartupflash.in/wp-json/wp/v2"

const USERNAME = process.env.WP_USERNAME
const APPLICATION_PASSWORD = process.env.WP_APP_PASSWORD

const TOKEN = Buffer.from(`${USERNAME || ""}:${APPLICATION_PASSWORD || ""}`).toString("base64")
const NEWSLETTER_WEBHOOK_URL = process.env.NEWSLETTER_WEBHOOK_URL || ""
const newsletterSubscribers = new Set()

const ALLOWED_STATUS = new Set(["draft", "publish"])

const normalizeArray = (value) => {
  if (!value) {
    return undefined
  }

  if (Array.isArray(value)) {
    const parsed = value.map(Number).filter(Number.isInteger)
    return parsed.length ? parsed : undefined
  }

  const parsed = String(value)
    .split(",")
    .map((item) => Number(item.trim()))
    .filter(Number.isInteger)

  return parsed.length ? parsed : undefined
}

const mapWpError = (error, fallbackMessage) => {
  const status = error?.response?.status || 500
  const wpMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    fallbackMessage

  return { status, message: wpMessage }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ===================================
   PUBLIC POSTS
=================================== */

app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(`${WORDPRESS_URL}/posts`, {
      params: {
        ...req.query,
        per_page: req.query.per_page || "10",
        _embed: 1
      }
    })

    res.json(response.data)
  } catch (error) {
    const mapped = mapWpError(error, "Failed to fetch posts")
    console.error("/api/posts failed", { status: mapped.status, message: mapped.message })

    res.status(mapped.status).json({
      error: "Failed to fetch posts",
      details: mapped.message
    })
  }
})

/* ===================================
   CATEGORIES
=================================== */

app.get("/api/categories", async (req, res) => {
  try {
    const response = await axios.get(`${WORDPRESS_URL}/categories?per_page=100`)
    res.json(response.data)
  } catch (error) {
    const mapped = mapWpError(error, "Failed to fetch categories")
    console.error("/api/categories failed", { status: mapped.status, message: mapped.message })

    res.status(mapped.status).json({
      error: "Failed to fetch categories",
      details: mapped.message
    })
  }
})

/* ===================================
   SINGLE POST
=================================== */

app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${WORDPRESS_URL}/posts/${req.params.id}?_embed`)
    res.json(response.data)
  } catch (error) {
    const mapped = mapWpError(error, "Failed to fetch post")
    console.error("/api/posts/:id failed", {
      postId: req.params.id,
      status: mapped.status,
      message: mapped.message
    })

    res.status(mapped.status).json({
      error: "Failed to fetch post",
      details: mapped.message
    })
  }
})

/* ===================================
   CREATE POST
=================================== */

app.post("/api/create-post", async (req, res) => {
  try {
    const title = String(req.body?.title || "").trim()
    const content = String(req.body?.content || "").trim()
    const excerpt = String(req.body?.excerpt || "").trim()
    const status = String(req.body?.status || "publish").trim().toLowerCase()
    const categories = normalizeArray(req.body?.categories)
    const tags = normalizeArray(req.body?.tags)

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    if (!content) {
      return res.status(400).json({ error: "Content is required" })
    }

    if (!ALLOWED_STATUS.has(status)) {
      return res.status(400).json({
        error: "Invalid status",
        details: "Allowed values: draft, publish"
      })
    }

    if (!USERNAME || !APPLICATION_PASSWORD) {
      return res.status(500).json({
        error: "Publishing is not configured",
        details: "Missing WP_USERNAME or WP_APP_PASSWORD"
      })
    }

    const response = await axios.post(
      `${WORDPRESS_URL}/posts`,
      {
        title,
        content,
        excerpt: excerpt || undefined,
        categories,
        tags,
        status
      },
      {
        headers: {
          Authorization: `Basic ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    )

    res.status(201).json({
      message: "Post created successfully",
      post: response.data
    })
  } catch (error) {
    const mapped = mapWpError(error, "Failed to create post")
    console.error("/api/create-post failed", {
      status: mapped.status,
      message: mapped.message
    })

    res.status(mapped.status).json({
      error: "Failed to create post",
      details: mapped.message
    })
  }
})

/* ===================================
   NEWSLETTER
=================================== */

app.post("/api/newsletter", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase()

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address" })
    }

    if (newsletterSubscribers.has(email)) {
      return res.status(200).json({ message: "You are already subscribed" })
    }

    if (NEWSLETTER_WEBHOOK_URL) {
      await axios.post(
        NEWSLETTER_WEBHOOK_URL,
        { email, source: "startupflash-web" },
        { timeout: 10000 }
      )
    }

    newsletterSubscribers.add(email)
    console.log("/api/newsletter subscribed", { email })

    return res.status(201).json({ message: "Subscription successful" })
  } catch (error) {
    const details = error?.response?.data?.message || error?.message || "Subscription failed"
    console.error("/api/newsletter failed", { message: details })

    return res.status(500).json({
      error: "Failed to subscribe",
      details
    })
  }
})

/* ===================================
   SERVER
=================================== */

const PORT = Number(process.env.PORT) || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
