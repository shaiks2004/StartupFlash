import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/pages/notfound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <Helmet>
        <title>404 | StartupFlash</title>
      </Helmet>

      <div className="scene">
        <div className="cat">
          <div className="ears">
            <span></span>
            <span></span>
          </div>

          <div className="head">
            <div className="eyes">
              <span></span>
              <span></span>
            </div>
            <div className="nose"></div>
          </div>

          <div className="body"></div>

          <div className="newspaper">
            <h3>StartupFlash</h3>
            <p>404 NEWS</p>
            <div className="lines"></div>
          </div>
        </div>

        <h1>Oops! Page Not Found</h1>

        <p>
          Even our newsroom cat couldn't find this story.
        </p>

        <Link className="home-btn" to="/">
          Back Home
        </Link>
      </div>
    </section>
  );
}