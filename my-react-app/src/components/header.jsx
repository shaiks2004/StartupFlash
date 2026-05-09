import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Flash View", to: "/flash-view" },
  { label: "Funding", to: "/funding" },
  { label: "Startup Stories", to: "/startup-stories" },
  { label: "Founders", to: "/founders" },
  { label: "Companies", to: "/companies" },
  { label: "AI", to: "/ai" },
  { label: "Insights", to: "/insights" }
]

function Header({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenu)

    return () => {
      document.body.classList.remove("menu-open")
    }
  }, [mobileMenu])

  return (
    <header className={`header ${scrolled ? "header-scroll" : ""}`}>
      <div className="header-container">
        <NavLink to="/" className="logo" aria-label="StartupFlash home">
          <img
            src="https://thestartupflash.in/wp-content/uploads/2026/05/cropped-Startup-flash-new-logo-150x76.jpeg"
            alt="StartupFlash"
          />
        </NavLink>

        <nav className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-right">
          <button className="icon-btn" onClick={onSearchOpen}>
            🔍
          </button>
          <a className="subscribe-btn" href="#newsletter">
            Subscribe
          </a>
          <a
            className="featured-btn"
            href="https://thestartupflash.in/get-featured/"
            target="_blank"
            rel="noreferrer"
          >
            Get Featured
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-expanded={mobileMenu}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div
          className="mobile-nav-overlay open"
          onClick={() => setMobileMenu(false)}
        >
          <div
            className="mobile-nav-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="mobile-nav" id="mobile-nav">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mobile-nav-actions">
              <button className="mobile-nav-search" onClick={onSearchOpen}>
                Search
              </button>
              <a className="mobile-nav-link" href="#newsletter">
                Subscribe
              </a>
              <a
                className="mobile-nav-featured"
                href="https://thestartupflash.in/get-featured/"
                target="_blank"
                rel="noreferrer"
              >
                Get Featured
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header