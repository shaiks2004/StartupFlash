import { Link } from "react-router-dom"
import { formatDate } from "../utils/content"
import { getFeaturedImage, getPrimaryCategory, getReadTime } from "../utils/wp"

function HeroEditorial({ hero, topStories = [] }) {
  if (!hero) {
    return null
  }

  const heroImage = getFeaturedImage(hero)
  const heroCategory = getPrimaryCategory(hero)
  const heroReadTime = getReadTime(hero.content?.rendered || "")

  return (

    <section className="editorial-hero">

      {/* LEFT SIDE */}

      <div className="editorial-main">

        <Link to={`/article/${hero.slug}`} className="editorial-image">
          {heroImage ? (
            <img src={heroImage} alt={hero.title?.rendered || ""} />
          ) : (
            <div className="image-placeholder" />
          )}
        </Link>

        <div className="editorial-content">
          <div className="editorial-tags">
            <span>{heroCategory}</span>
            <span>Cover Story</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: hero.title?.rendered || "" }} />
          <p dangerouslySetInnerHTML={{ __html: hero.excerpt?.rendered || "" }} />
          <div className="editorial-meta">
            <strong>{hero._embedded?.author?.[0]?.name || "StartupFlash"}</strong>
            <span>•</span>
            <span>{formatDate(hero.date)}</span>
            <span>⏱ {heroReadTime}</span>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="top-stories">

        <div className="top-stories-header">
          <h3>Top Stories</h3>
          <Link to="/">All ↗</Link>
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
                  __html: story.title?.rendered || ""
                }}
              />
              <div className="story-meta">
                {story._embedded?.author?.[0]?.name || "StartupFlash"} • {getReadTime(
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