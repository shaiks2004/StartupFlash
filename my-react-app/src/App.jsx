import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"

const MainLayout = lazy(() => import("./layouts/MainLayout"))
const Home = lazy(() => import("./pages/Home"))
const CategoryPage = lazy(() => import("./pages/CategoryPage"))
const ArticlePage = lazy(() => import("./pages/ArticlePage"))
const SearchPage = lazy(() => import("./pages/SearchPage"))
const NotFound = lazy(() => import("./pages/NotFound"))

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
          <Route path="/funding" element={<CategoryPage />} />
          <Route path="/founders" element={<CategoryPage />} />
          <Route path="/startup-stories" element={<CategoryPage />} />
          <Route path="/companies" element={<CategoryPage />} />
          <Route path="/ai" element={<CategoryPage />} />
          <Route path="/insights" element={<CategoryPage />} />
          <Route path="/flash-view" element={<CategoryPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/aboutus" element={<AboutUs />} /> */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
