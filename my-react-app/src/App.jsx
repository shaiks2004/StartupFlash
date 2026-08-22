import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

const MainLayout = lazy(() => import("./layouts/MainLayout"))
const Home = lazy(() => import("./pages/Home"))
const CategoryPage = lazy(() => import("./pages/CategoryPage"))
const ArticlePage = lazy(() => import("./pages/ArticlePage"))
const SearchPage = lazy(() => import("./pages/SearchPage"))
const NotFound = lazy(() => import("./pages/NotFound"))
const GetFeatured = lazy(() => import("./pages/GetFeatured"))
const AboutUs = lazy(() => import("./components/aboutus"))
const Contact = lazy(() => import("./pages/Contact"))
const Advertise = lazy(() => import("./pages/Advertise"))
const Policies = lazy(() => import("./pages/Policies"))

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      Loading page...
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/flash-view" element={<CategoryPage />} />
          <Route path="/metrics" element={<CategoryPage />} />
          <Route path="/funding" element={<CategoryPage />} />
          <Route path="/founders" element={<CategoryPage />} />
          <Route path="/companies" element={<CategoryPage />} />
          <Route path="/library" element={<CategoryPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/get-featured" element={<GetFeatured />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/privacy" element={<Policies />} />
          <Route path="/cookies" element={<Policies />} />
          <Route path="/editorial-policy" element={<Policies />} />
          <Route path="/disclaimer" element={<Policies />} />
          <Route path="/terms" element={<Policies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
