import { Link } from "react-router-dom"
import { usePosts } from "../hooks/usePosts"
import ArticleCard from "./ArticleCard"
import LoadingSkeleton from "./LoadingSkeleton"

function CategorySection({ title, categoryId, slug }) {
  const { posts, loading, error } = usePosts({
    categories: categoryId,
    per_page: 4
  })

  return (
    <section className="category-section">
      <div className="section-header">
        <div>
          <p>SECTION</p>
          <h2>{title}</h2>
        </div>
        <Link to={`/${slug}`}>View all ↗</Link>
      </div>

      {loading && <LoadingSkeleton lines={2} />}
      {error && <p className="error-text">{error}</p>}

      <div className="category-grid">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection
