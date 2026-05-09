import { Outlet, useLocation } from "react-router-dom"
import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import ScrollToTop from "../components/ScrollToTop"
import SearchModal from "../components/SearchModal"

function MainLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="app-shell">
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
