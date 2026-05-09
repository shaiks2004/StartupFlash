import { Link } from "react-router-dom"
import { formatDate } from "../utils/content"
import { getFeaturedImage, getPrimaryCategory } from "../utils/wp"

function ArticleCard({ post, variant = "default" }) {
  const image = getFeaturedImage(post)
  const category = getPrimaryCategory(post)

  return (
    <article className={`article-card ${variant}`}>
      <Link to={`/article/${post.slug}`} className="article-link">
        <div className="article-media">
          {image ? (
            <img src={image} alt={post.title?.rendered || ""} loading="lazy" />
          ) : (
            <div className="article-placeholder" />
          )}
        </div>
        <div className="article-body">
          <span className="article-category">{category}</span>
          <h3
            className="article-title"
            dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }}
          />
          {post.excerpt?.rendered && (
            <p
              className="article-excerpt"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          )}
          <div className="article-meta">
            <span>{post._embedded?.author?.[0]?.name || "StartupFlash"}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ArticleCard
