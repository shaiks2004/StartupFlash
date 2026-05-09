import "../App.css"

function HeroSection() {

  return (

    <section className="hero-section">

      {/* LEFT BIG ARTICLE */}

      <div className="hero-main">

        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
          alt="Featured Startup"
        />

        <div className="hero-overlay">

          <span className="hero-category">
            FUNDING
          </span>

          <h1>

            Indian AI Startup Raises $120M
            To Transform Enterprise Automation

          </h1>

          <p>

            The Bengaluru-based startup plans global expansion
            after securing one of the largest AI funding rounds
            this year.

          </p>

        </div>

      </div>

      {/* RIGHT SIDE ARTICLES */}

      <div className="hero-side">

        {/* CARD 1 */}

        <div className="hero-side-card">

          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1000&auto=format&fit=crop"
            alt=""
          />

          <div className="hero-side-content">

            <span>FOUNDERS</span>

            <h3>

              How Two College Dropouts Built
              A Billion Dollar SaaS Startup

            </h3>

          </div>

        </div>

        {/* CARD 2 */}

        <div className="hero-side-card">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
            alt=""
          />

          <div className="hero-side-content">

            <span>STARTUPS</span>

            <h3>

              India's Startup Ecosystem Sees
              Massive Growth In 2025

            </h3>

          </div>

        </div>

      </div>

    </section>

  )

}

export default HeroSection