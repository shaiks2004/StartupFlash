require("dotenv").config()

const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(cors())

app.use(express.json())

/* ===================================
   ENV VARIABLES
=================================== */

const WORDPRESS_URL =
  "https://thestartupflash.in/wp-json/wp/v2"

const USERNAME =
  process.env.WP_USERNAME

const APPLICATION_PASSWORD =
  process.env.WP_APP_PASSWORD

const TOKEN = Buffer.from(
  `${USERNAME}:${APPLICATION_PASSWORD}`
).toString("base64")

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

    console.log("/api/posts", req.query)

    res.json(response.data)

  } catch (error) {

    res.status(500).json({

      error: "Failed to fetch posts"

    })

  }

})

/* ===================================
   CATEGORIES
=================================== */

app.get("/api/categories", async (req, res) => {

  try {

    const response = await axios.get(

      `${WORDPRESS_URL}/categories?per_page=100`

    )

    res.json(response.data)

  } catch (error) {

    res.status(500).json({

      error: "Failed to fetch categories"

    })

  }

})

/* ===================================
   SINGLE POST
=================================== */

app.get("/api/posts/:id", async (req, res) => {

  try {

    const response = await axios.get(

      `${WORDPRESS_URL}/posts/${req.params.id}?_embed`

    )

    res.json(response.data)

  } catch (error) {

    res.status(500).json({

      error: "Failed to fetch post"

    })

  }

})

/* ===================================
   CREATE POST
=================================== */

app.post("/api/create-post", async (req, res) => {

  try {

    const response = await axios.post(

      `${WORDPRESS_URL}/posts`,

      {

        title: req.body.title,

        content: req.body.content,

        status: "publish"

      },

      {

        headers: {

          Authorization: `Basic ${TOKEN}`,

          "Content-Type": "application/json"

        }

      }

    )

    res.json(response.data)

  } catch (error) {

    res.status(500).json({

      error: "Failed to create post"

    })

  }

})

/* ===================================
   SERVER
=================================== */

const PORT = 5000

app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`

  )

})