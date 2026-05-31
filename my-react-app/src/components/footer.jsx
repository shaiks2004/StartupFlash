import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>StartupFlash</h2>
          <p>
            Premium startup journalism. Funding intelligence, founder stories,
            and market-shaping analysis.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Sections</h4>
            <Link to="/funding">Funding</Link>
            <Link to="/startup-stories">Startup Stories</Link>
            <Link to="/founders">Founders</Link>
            <Link to="/ai">AI</Link>
            <Link to="/insights">Insights</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/aboutus">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/advertise">Advertise</Link>
            <Link to="/featured">Get Featured</Link>
          </div>

          <div>
            <h4>Social</h4>
            <Link to="https://twitter.com/startup_flash" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
            <Link to="https://www.linkedin.com/company/startupflash" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
            <Link to="https://www.instagram.com/startup_flash/?hl=en" target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>� 2026 StartupFlash. All rights reserved.</p>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
