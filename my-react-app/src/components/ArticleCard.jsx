import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { formatDate } from "../utils/content";
import { getFeaturedImage, getPrimaryCategory } from "../utils/wp";

const DEFAULT_IMAGE = "/flash.png"; // Put flash.png inside public/

function ArticleCard({ post, variant = "default" }) {
  const [imageSrc, setImageSrc] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    const featuredImage = getFeaturedImage(post);
    setImageSrc(featuredImage || DEFAULT_IMAGE);
  }, [post]);

  const category = getPrimaryCategory(post);

  return (
    <article className={`article-card ${variant}`}>
      <Link to={`/article/${post.slug}`} className="article-link">
        <div className="article-media">
          <img
            src={imageSrc}
            alt={post.title?.rendered || "Article image"}
            loading="lazy"
            onError={() => setImageSrc(DEFAULT_IMAGE)}
          />
        </div>

        <div className="article-body">
          <span className="article-category">
            {category || "Startup"}
          </span>

          <h3
            className="article-title"
            dangerouslySetInnerHTML={{
              __html: post.title?.rendered || "Untitled story",
            }}
          />

          <p
            className="article-excerpt"
            dangerouslySetInnerHTML={{
              __html:
                post.excerpt?.rendered ||
                "Read the latest startup and technology insights from StartupFlash.",
            }}
          />

          <div className="article-meta">
            <span>
              {post._embedded?.author?.[0]?.name || "StartupFlash"}
            </span>

            <span>
              <Dot size={14} aria-hidden="true" />
            </span>

            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ArticleCard;