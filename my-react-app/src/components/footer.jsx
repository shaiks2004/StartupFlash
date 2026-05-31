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
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Advertise</a>
            <a href="#featured">Get Featured</a>
          </div>

          <div>
            <h4>Social</h4>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 StartupFlash. All rights reserved.</p>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
