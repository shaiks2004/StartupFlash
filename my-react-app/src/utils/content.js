export const extractHeadings = (html = "") => {
  if (typeof window === "undefined") {
    return []
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const headings = Array.from(doc.querySelectorAll("h2, h3"))

  return headings
    .filter((node) => node.textContent)
    .map((node, index) => {
      const id = node.id || `section-${index + 1}`
      node.id = id
      return {
        id,
        text: node.textContent.trim(),
        level: node.tagName.toLowerCase()
      }
    })
}

export const buildContentWithToc = (html = "") => {
  if (typeof window === "undefined") {
    return { content: html, headings: [] }
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const headingNodes = Array.from(doc.querySelectorAll("h2, h3"))

  const headings = headingNodes
    .filter((node) => node.textContent)
    .map((node, index) => {
      const id = node.id || `section-${index + 1}`
      node.id = id
      return {
        id,
        text: node.textContent.trim(),
        level: node.tagName.toLowerCase()
      }
    })

  return { content: doc.body.innerHTML, headings }
}

export const extractHeroImageFromContent = (html = "") => {
  if (typeof window === "undefined") {
    return { content: html, hero: null }
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const firstImage = doc.querySelector("img")

  if (!firstImage) {
    return { content: doc.body.innerHTML, hero: null }
  }

  const hero = {
    src: firstImage.getAttribute("src") || "",
    alt: firstImage.getAttribute("alt") || ""
  }

  firstImage.remove()

  return { content: doc.body.innerHTML, hero }
}

export const insertInlineAdAfterFirstParagraph = (html = "") => {
  if (typeof window === "undefined") {
    return html
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const firstParagraph = doc.querySelector("p")

  if (!firstParagraph) {
    return doc.body.innerHTML
  }

  const ad = doc.createElement("div")
  ad.className = "ad-inline"
  ad.innerHTML = "<span>Advertisement</span><strong>Sponsored insight</strong>"

  firstParagraph.insertAdjacentElement("afterend", ad)

  return doc.body.innerHTML
}

export const formatDate = (value) => {
  if (!value) {
    return ""
  }

  const date = new Date(value)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}
