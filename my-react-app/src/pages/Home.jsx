import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { usePosts } from "../hooks/usePosts"
import { useCategories } from "../hooks/useCategories"
import Ticker from "../components/Ticker"
import HeroEditorial from "../components/HeroEditorial"
import Spotlight from "../components/Spotlight"
import TheFeed from "../components/TheFeed"
import CategorySection from "../components/CategorySection"
import Newsletter from "../components/Newsletter"
import LoadingSkeleton from "../components/LoadingSkeleton"
import AdBanner from "../components/AdBanner"

const CATEGORY_SECTIONS = [
  { slug: "funding", title: "Funding" },
  { slug: "founders", title: "Founders" },
  { slug: "startup-stories", title: "Startup Stories" },
  { slug: "companies", title: "Companies" },
  { slug: "ai", title: "AI" },
  { slug: "insights", title: "Insights" }
]

function Home() {
  const { posts, loading, error } = usePosts({ per_page: 12 })
  const { categories } = useCategories()

  const hero = posts?.[0]
  const topStories = posts?.slice(1, 4) || []
  const spotlight = posts?.[4] || posts?.[0]

  const tickerItems = useMemo(
    () => posts.map((post) => post.title?.rendered || "").filter(Boolean),
    [posts]
  )

  const sectionMap = useMemo(() => {
    const map = new Map()
    categories.forEach((category) => map.set(category.slug, category.id))
    return map
  }, [categories])

  return (
    <div className="home">
      <Helmet>
        <title>StartupFlash | Startup News & Funding Intelligence</title>
        <meta
          name="description"
          content="StartupFlash delivers premium startup journalism, funding signals, and founder stories."
        />
      </Helmet>

      <Ticker items={tickerItems} />
      {loading && !hero ? (
        <LoadingSkeleton lines={4} />
      ) : (
        <HeroEditorial hero={hero} topStories={topStories} />
      )}
      {!loading && error && !hero && (
        <p className="error-text">Unable to load latest stories right now.</p>
      )}
      {!loading && !error && !hero && (
        <p className="error-text">No featured stories are available yet.</p>
      )}
      <AdBanner variant="leaderboard" />
      {loading && !spotlight ? (
        <LoadingSkeleton lines={3} />
      ) : (
        <Spotlight post={spotlight} />
      )}
      <AdBanner variant="rectangle" />
      <TheFeed posts={posts} loading={loading} error={error} />

      {CATEGORY_SECTIONS.map((section) => {
        const categoryId = sectionMap.get(section.slug)
        if (!categoryId) {
          return null
        }

        return (
          <CategorySection
            key={section.slug}
            title={section.title}
            slug={section.slug}
            categoryId={categoryId}
          />
        )
      })}
      <AdBanner variant="leaderboard" />
      <Newsletter />
    </div>
  )
}

export default Home
