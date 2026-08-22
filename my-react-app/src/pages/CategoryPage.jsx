import { Link, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import { useCategories } from "../hooks/useCategories"
import { usePosts } from "../hooks/usePosts"
import ArticleCard from "../components/ArticleCard"
import LoadingSkeleton from "../components/LoadingSkeleton"
import AdBanner from "../components/AdBanner"
import "../styles/pages/category.css"
import "../styles/components/card-utilities.css"
import "../styles/components/ad-utilities.css"
import "../styles/components/ad-banner-slot.css"

const CATEGORY_LABELS = {
  funding: "Funding",
  founders: "Founders",
  "startup-stories": "Startup Stories",
  companies: "Companies",
  ai: "AI",
  insights: "Insights",
  "flash-view": "Flash View"
}

function CategoryPage() {
  const location = useLocation()
  const slug = location.pathname.replace("/", "")
  const { categories, loading: categoriesLoading } = useCategories()

  const matchedCategory = useMemo(() => {
    return categories.find((category) => category.slug === slug)
  }, [categories, slug])

  const categoryId = matchedCategory?.id

  const { posts, loading, error, hasMore, loadMore } = usePosts({
    categories: categoryId,
    per_page: 9,
    enabled: Boolean(categoryId)
  })

  const featured = posts[0]
  const topStories = posts.slice(1, 4)
  const rest = posts.slice(4)

  const label = CATEGORY_LABELS[slug] || "Category"

  return (
    <section className="category-page">
      <Helmet>
        <title>{label} | StartupFlash</title>
        <meta
          name="description"
          content={`Latest ${label} stories from StartupFlash.`}
        />
      </Helmet>

      <div className="page-header">
        <div>
          <p>SECTION</p>
          <h1>{label}</h1>
          {matchedCategory?.description && (
            <p className="page-description">{matchedCategory.description}</p>
          )}
          <Link to="/" className="page-back">
            Back to home <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="category-header-ads">
          <div className="sponsor-mini">
            <span>Sponsored</span>
            <strong>Founder launch kit</strong>
          </div>
          <div className="sponsor-mini">
            <span>Sponsored</span>
            <strong>Startup signals</strong>
          </div>
        </div>
      </div>

      {(categoriesLoading || loading) && <LoadingSkeleton lines={4} />}
      {error && <p className="error-text">{error}</p>}
      {!categoriesLoading && !categoryId && (
        <p className="error-text">This section is not available yet.</p>
      )}

      <div className="category-hero">
        <div className="category-featured">
          {featured && <ArticleCard post={featured} variant="featured" />}
        </div>
        <div className="category-hero-stories">
          <div className="top-stories-row">
            <p>TOP STORIES</p>
            <div className="top-stories-grid">
              {topStories.map((post) => (
                <ArticleCard key={post.id} post={post} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdBanner variant="leaderboard" />

      <div className="feed-grid">
        {rest.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {!categoriesLoading && !loading && !error && posts.length === 0 && (
        <p className="error-text">No stories are available in this section yet.</p>
      )}

      {hasMore && (
        <button className="load-more" onClick={loadMore} type="button">
          Load more
        </button>
      )}
    </section>
  )
}

export default CategoryPage
