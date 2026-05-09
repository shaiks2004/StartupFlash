import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

function NotFound() {
  return (
    <section className="not-found">
      <Helmet>
        <title>Page Not Found | StartupFlash</title>
      </Helmet>
      <h1>Page not found</h1>
      <p>The story you are looking for moved or no longer exists.</p>
      <Link to="/">Return home</Link>
    </section>
  )
}

export default NotFound
