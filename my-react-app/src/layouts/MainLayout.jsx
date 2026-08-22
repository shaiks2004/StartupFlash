import { Outlet, useLocation } from "react-router-dom"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import Header from "../components/header"
import Footer from "../components/footer"
import ScrollToTop from "../components/ScrollToTop"
import SearchModal from "../components/SearchModal"
import "../styles/components/shared-layout.css"

function MainLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="app-shell">
      <Helmet>
        {import.meta.env.VITE_ENV !== "production" && (
          <meta name="robots" content="noindex" />
        )}
      </Helmet>
      <ScrollToTop key={location.pathname} />
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
