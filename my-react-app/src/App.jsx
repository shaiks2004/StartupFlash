import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"


const MainLayout = lazy(() => import("./layouts/MainLayout"))
const Home = lazy(() => import("./pages/Home"))
const CategoryPage = lazy(() => import("./pages/CategoryPage"))
const ArticlePage = lazy(() => import("./pages/ArticlePage"))
const SearchPage = lazy(() => import("./pages/SearchPage"))
const NotFound = lazy(() => import("./pages/NotFound"))
const GetFeatured = lazy(() => import("./pages/GetFeatured"))

function RouteFallback() {
return ( <div className="route-fallback" role="status" aria-live="polite">
Loading page... </div>
)
}

function App() {
return (
<Suspense fallback={<RouteFallback />}> <Routes>
<Route element={<MainLayout />}>

```
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Categories */}
      <Route path="/flash-view" element={<CategoryPage />} />
      <Route path="/metrics" element={<CategoryPage />} />
      <Route path="/funding" element={<CategoryPage />} />
      <Route path="/founders" element={<CategoryPage />} />
      <Route path="/companies" element={<CategoryPage />} />
      <Route path="/library" element={<CategoryPage />} />

      {/* Articles */}
      <Route path="/article/:slug" element={<ArticlePage />} />

      {/* Search */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/get-featured" element={<GetFeatured />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Route>
  </Routes>
</Suspense>

)
}

export default App
