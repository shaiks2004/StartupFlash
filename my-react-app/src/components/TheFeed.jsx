import { ArrowUpRight } from "lucide-react"
import ArticleCard from "./ArticleCard"
import LoadingSkeleton from "./LoadingSkeleton"

function TheFeed({ posts = [], loading, error }) {
  return (
    <section className="feed-section">
      <div className="feed-header">
        <div>
          <p>EDITORIAL FEED</p>
          <h2>The Feed</h2>
        </div>
        <span className="feed-label">Latest stories <ArrowUpRight size={14} aria-hidden="true" /></span>
      </div>

      {loading && <LoadingSkeleton lines={3} />}
      {error && <p className="error-text">{error}</p>}
      <div className="feed-grid">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
        {posts.length >= 3 && (
          <div className="sponsored-card">
            <span>Sponsored</span>
            <h3>Scale faster with premium startup intelligence</h3>
            <p>Curated briefings for founders, VCs, and operators.</p>
            <a href="#newsletter">Learn more</a>
          </div>
        )}
      </div>
      {!loading && !error && posts.length === 0 && (
        <p className="error-text">No stories available yet.</p>
      )}
    </section>
  )
}

export default TheFeed
