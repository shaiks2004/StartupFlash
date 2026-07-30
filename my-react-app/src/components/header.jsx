import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu, Search, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Flash View", to: "/flash-view" },
  { label: "Metrics", to: "/metrics" },
  { label: "Funding", to: "/funding" },
  { label: "Founders", to: "/founders" },
  { label: "Companies", to: "/companies" },
  { label: "Library", to: "/library" }
]

function Header({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const mobilePanelRef = useRef(null)
  const lastFocusedRef = useRef(null)

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

  useEffect(() => {
    if (!mobileMenu) {
      return
    }

    lastFocusedRef.current = document.activeElement

    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",")

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setMobileMenu(false)
        return
      }

      if (event.key !== "Tab" || !mobilePanelRef.current) {
        return
      }

      const focusable = Array.from(mobilePanelRef.current.querySelectorAll(selectors))
      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeydown)
    const firstFocusable = mobilePanelRef.current?.querySelector("a, button")
    firstFocusable?.focus()

    return () => {
      document.removeEventListener("keydown", handleKeydown)
      lastFocusedRef.current?.focus?.()
    }
  }, [mobileMenu])

  return (
    <header className={`header ${scrolled ? "header-scroll" : ""}`}>
      <div className="header-container">
        <NavLink to="/" className="logo" aria-label="StartupFlash home">
          {logoError ? (
            <span className="logo-fallback">StartupFlash</span>
          ) : (
            <img
              src="https://thestartupflash.in/wp-content/uploads/2026/05/cropped-Startup-flash-new-logo-150x76.jpeg"
              alt="StartupFlash"
              onError={() => setLogoError(true)}
            />
          )}
        </NavLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
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
          <button
            className="icon-btn"
            onClick={onSearchOpen}
            aria-label="Open search"
            type="button"
          >
            <Search size={16} aria-hidden="true" />
          </button>
          <a className="subscribe-btn" href="#newsletter">
            Subscribe
          </a>
          <NavLink
            className="mobile-nav-featured featured-btn"
            to="/get-featured"
            onClick={() => setMobileMenu(false)}
          >
            Get Featured 🚀
          </NavLink>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-expanded={mobileMenu}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            type="button"
          >
            {mobileMenu ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div
          className="mobile-nav-overlay open"
          onClick={() => setMobileMenu(false)}
          role="presentation"
        >
          <div
            className="mobile-nav-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            ref={mobilePanelRef}
          >
            <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
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
              <button
                className="mobile-nav-search"
                onClick={onSearchOpen}
                type="button"
                aria-label="Open search"
              >
                Search
              </button>
              <a className="mobile-nav-link" href="#newsletter">
                Subscribe
              </a>
              <NavLink
                className="featured-btn featured-btn-mobile"
                to="/get-featured"
              >
                Get Featured 🚀
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
