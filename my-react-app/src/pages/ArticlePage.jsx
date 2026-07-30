import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowLeft, Dot, Link as LinkIcon } from "lucide-react"
import DOMPurify from "dompurify"
import { usePost } from "../hooks/usePost"
import { usePosts } from "../hooks/usePosts"
import {
  buildContentWithToc,
  extractHeroImageFromContent,
  formatDate,
  insertInlineAdAfterFirstParagraph
} from "../utils/content"
import { getCategoryIds, getReadTime, stripHtml } from "../utils/wp"
import ProgressBar from "../components/ProgressBar"
import LoadingSkeleton from "../components/LoadingSkeleton"
import ArticleCard from "../components/ArticleCard"
import AdBanner from "../components/AdBanner"

function ArticlePage() {
  const { slug } = useParams()
  const { post, loading, error } = usePost({ slug })
  const [heroFailed, setHeroFailed] = useState(false)

  const sanitized = useMemo(() => {
    const { content, hero } = extractHeroImageFromContent(
      post?.content?.rendered || ""
    )
    const withAd = insertInlineAdAfterFirstParagraph(content)
    const clean = DOMPurify.sanitize(withAd)
    return { ...buildContentWithToc(clean), hero }
  }, [post])

  const primaryCategoryId = post?.categories?.[0] || getCategoryIds(post)[0]
  const { posts: relatedPosts } = usePosts({
    categories: primaryCategoryId,
    per_page: 6,
    enabled: Boolean(primaryCategoryId)
  })

  if (loading) {
    return <LoadingSkeleton lines={6} />
  }

  if (error || !post) {
    return <p className="error-text">Unable to load article.</p>
  }

  const readTime = getReadTime(post.content?.rendered || "")
  const canonical = typeof window !== "undefined" ? window.location.href : ""
  const description = stripHtml(post.excerpt?.rendered || "")
  const shareUrl = encodeURIComponent(canonical)
  const shareTitle = encodeURIComponent(stripHtml(post.title?.rendered || ""))
  const heroImage = heroFailed ? "" : sanitized.hero?.src || ""
  const related = relatedPosts.filter((item) => item.id !== post.id).slice(0, 3)
  const showRelated = related.length >= 3
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: stripHtml(post.title?.rendered || ""),
    image: heroImage ? [heroImage] : undefined,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: post._embedded?.author?.[0]?.name || "StartupFlash"
    },
    publisher: {
      "@type": "Organization",
      name: "StartupFlash",
      logo: {
        "@type": "ImageObject",
        url: "https://thestartupflash.in/wp-content/uploads/2026/05/cropped-Startup-flash-new-logo-150x76.jpeg"
      }
    },
    mainEntityOfPage: canonical || undefined
  }

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(canonical)
    }
  }

  return (
    <article className="article-page">
      <Helmet>
        <title>{post.title?.rendered} | StartupFlash</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title?.rendered || ""} />
        <meta property="og:description" content={description} />
        {heroImage && <meta property="og:image" content={heroImage} />}
        {canonical && <meta property="og:url" content={canonical} />}
        <meta name="twitter:card" content="summary_large_image" />
        {canonical && <link rel="canonical" href={canonical} />}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <ProgressBar />

      <header className="article-hero">
        <Link to="/" className="back-link">
          <ArrowLeft size={14} aria-hidden="true" /> Back to home
        </Link>
        <h1 dangerouslySetInnerHTML={{ __html: post.title?.rendered || "Untitled story" }} />
        <div className="article-meta">
          <span>{post._embedded?.author?.[0]?.name || "StartupFlash"}</span>
          <span><Dot size={14} aria-hidden="true" /></span>
          <span>{formatDate(post.date)}</span>
          <span><Dot size={14} aria-hidden="true" /></span>
          <span>{readTime}</span>
        </div>
        {heroImage && (
          <img
            src={heroImage}
            alt={sanitized.hero?.alt || post.title?.rendered || "Article hero image"}
            loading="lazy"
            decoding="async"
            onError={() => setHeroFailed(true)}
          />
        )}
      </header>

      <div className="article-share-mobile">
        <span>Share</span>
        <button onClick={handleCopy} type="button"><LinkIcon size={12} aria-hidden="true" /> Copy link</button>
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
          target="_blank"
          rel="noreferrer"
        >
          X / Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>

      <AdBanner variant="leaderboard" />

      {sanitized.headings.length > 0 && (
        <aside className="article-toc">
          <h3>On this page</h3>
          <ul>
            {sanitized.headings.map((heading) => (
              <li key={heading.id} className={heading.level}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="article-layout">
        <aside className="article-share-sidebar">
          <span>Share</span>
          <button onClick={handleCopy} type="button">Copy link</button>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
            target="_blank"
            rel="noreferrer"
          >
            X / Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </aside>

        <section
          className="article-content"
          dangerouslySetInnerHTML={{ __html: sanitized.content }}
        />

        <aside className="article-rail-ad">
          <AdBanner variant="rectangle" />
        </aside>
      </div>

      <div className="article-author">
        <div>
          <p>Written by</p>
          <h4>{post._embedded?.author?.[0]?.name || "StartupFlash"}</h4>
        </div>
        <span>StartupFlash Editorial</span>
      </div>

      {showRelated && (
        <section className="related-articles">
          <div className="section-header">
            <div>
              <p>RELATED</p>
              <h2>Related stories</h2>
            </div>
          </div>
          <div className="feed-grid">
            {related.map((item) => (
              <ArticleCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      )}
      {!showRelated && (
        <section className="related-articles">
          <div className="section-header">
            <div>
              <p>RELATED</p>
              <h2>Related stories</h2>
            </div>
          </div>
          <p className="error-text">No related stories available yet.</p>
        </section>
      )}
    </article>
  )
}

export default ArticlePage
