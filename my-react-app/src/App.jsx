import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import ArticlePage from "./pages/ArticlePage"
import SearchPage from "./pages/SearchPage"
import NotFound from "./pages/NotFound"

function App() {
  return (
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
