import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, Dot } from "lucide-react"
import { formatDate } from "../utils/content"
import { getFeaturedImage, getPrimaryCategory, getReadTime } from "../utils/wp"

function HeroEditorial({ hero, topStories = [] }) {
  const [heroImageFailed, setHeroImageFailed] = useState(false)

  if (!hero) {
    return null
  }

  const heroImage = heroImageFailed ? "" : getFeaturedImage(hero)
  const heroCategory = getPrimaryCategory(hero)
  const heroReadTime = getReadTime(hero.content?.rendered || "")

  return (
    <section className="editorial-hero">
      <div className="editorial-main">
        <Link to={`/article/${hero.slug}`} className="editorial-image">
          {heroImage ? (
            <img
              src={heroImage}
              alt={hero.title?.rendered || "Top story image"}
              loading="lazy"
              onError={() => setHeroImageFailed(true)}
            />
          ) : (
            <div className="image-placeholder" />
          )}
        </Link>

        <div className="editorial-content">
          <div className="editorial-tags">
            <span>{heroCategory}</span>
            <span>Cover Story</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: hero.title?.rendered || "Untitled story" }} />
          <p dangerouslySetInnerHTML={{ __html: hero.excerpt?.rendered || "A curated analysis from StartupFlash." }} />
          <div className="editorial-meta">
            <strong>{hero._embedded?.author?.[0]?.name || "StartupFlash"}</strong>
            <span><Dot size={14} aria-hidden="true" /></span>
            <span>{formatDate(hero.date)}</span>
            <span>{heroReadTime}</span>
          </div>
        </div>
      </div>

      <div className="top-stories">
        <div className="top-stories-header">
          <h3>Top Stories</h3>
          <Link to="/" className="section-link">All <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>

        {topStories.map((story, index) => (
          <Link
            key={story.id}
            to={`/article/${story.slug}`}
            className="story-item"
          >
            <div className="story-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="story-content">
              <span className="story-category">
                {getPrimaryCategory(story)}
              </span>
              <h4
                dangerouslySetInnerHTML={{
                  __html: story.title?.rendered || "Untitled story"
                }}
              />
              <div className="story-meta">
                {story._embedded?.author?.[0]?.name || "StartupFlash"} <Dot size={12} aria-hidden="true" /> {getReadTime(
                  story.content?.rendered || ""
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HeroEditorial
