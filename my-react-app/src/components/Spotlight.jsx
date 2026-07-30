import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { getFeaturedImage, getReadTime, stripHtml } from "../utils/wp"

function Spotlight({ post }) {
  if (!post) {
    return null
  }

  const image = getFeaturedImage(post)
  const summary = stripHtml(post.excerpt?.rendered || "").slice(0, 180)
  const meta = post.acf || {}

  return (
    <section className="spotlight-editorial">
      <div className="spotlight-top">
        <p>DAILY SPOTLIGHT</p>
        <h2>Startup of the day</h2>
      </div>

      <div className="spotlight-box">
        <div className="spotlight-left">
          {image ? (
            <img
              src={image}
              alt={post.title?.rendered || "Startup spotlight"}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.display = "none"
                const sibling = event.currentTarget.nextElementSibling
                if (sibling) sibling.style.display = "block"
              }}
            />
          ) : null}
          <div className="image-placeholder" style={{ display: image ? "none" : "block" }} />
        </div>

        <div className="spotlight-right">
          <div>
            <span className="spotlight-location">
              {meta.location || "Global"}
            </span>
            <h3 dangerouslySetInnerHTML={{ __html: post.title?.rendered || "Untitled story" }} />
            <p className="spotlight-text">
              {summary || "A closer look at the company shaping the next wave."}
            </p>
          </div>

          <div className="spotlight-stats-clean">
            <div>
              <span>VALUATION</span>
              <h4>{meta.valuation || "$5B+"}</h4>
            </div>
            <div>
              <span>LAST RAISE</span>
              <h4>{meta.funding || "$20M"}</h4>
            </div>
            <div>
              <span>READ TIME</span>
              <h4>{getReadTime(post.content?.rendered || "")}</h4>
            </div>
          </div>

          <div className="spotlight-footer-clean">
            <div>
              <span>FOUNDER</span>
              <h5>{meta.founder || post._embedded?.author?.[0]?.name || "Founder"}</h5>
            </div>
            <Link to={`/article/${post.slug}`} className="spotlight-cta">
              Read story <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Spotlight
