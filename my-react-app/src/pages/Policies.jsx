import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import "../styles/pages/policies.css"

const sections = [
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "editorial-policy", label: "Editorial Policy" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "terms", label: "Terms & Conditions" },
]

function Policies() {
  return (
    <main className="policies-page">
      <Helmet>
        <title>Policies | StartupFlash</title>
        <meta
          name="description"
          content="Read the StartupFlash privacy policy, editorial policy, disclaimer, and terms and conditions."
        />
      </Helmet>

      <div className="policies-page__inner">
        <header className="policies-page__hero">
          <div>
            <p className="policies-page__eyebrow">StartupFlash newsroom</p>
            <h1>Our policies, clearly stated.</h1>
            <p>
              These policies explain how Startup Flash handles information,
              publishes stories, and sets expectations for everyone who uses
              the platform.
            </p>
          </div>
          <div className="policies-page__index" aria-label="Policy sections">
            <span>On this page</span>
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                {section.label}
              </a>
            ))}
          </div>
        </header>

        <div className="policies-page__body">
          <section className="policy-section" id="privacy-policy">
            <div className="policy-section__number">01</div>
            <div>
              <p className="policy-section__eyebrow">Privacy</p>
              <h2>Privacy Policy</h2>
              <p>
                Startup Flash respects your privacy and is committed to
                protecting any information you share with us.
              </p>
              <p>
                We may collect limited personal information such as your name
                or email address when you voluntarily provide it, for example
                through contact forms or newsletter subscriptions. This
                information is used only to communicate with you or improve our
                services.
              </p>
              <p>
                We do not sell, trade, or rent user data to third parties. Basic
                analytics tools may be used to understand website traffic and
                user behavior for improvement purposes.
              </p>
              <p>
                Third-party services, including advertising partners, may use
                cookies or similar technologies. You can choose to disable
                cookies through your browser settings.
              </p>
              <p>
                By using Startup Flash, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </div>
          </section>

          <section className="policy-section" id="editorial-policy">
            <div className="policy-section__number">02</div>
            <div>
              <p className="policy-section__eyebrow">Standards</p>
              <h2>Editorial Policy</h2>
              <p>
                Startup Flash follows editorial standards focused on accuracy,
                original reporting, source verification, and timely updates.
              </p>
              <p>
                We strive to provide reliable startup news, founder stories,
                and funding updates. If errors are identified, we correct and
                update content promptly.
              </p>
              <p>
                For corrections or concerns, contact us through our Contact
                page.
              </p>
              <Link className="policy-section__link" to="/contact">
                Contact the newsroom
              </Link>
            </div>
          </section>

          <section className="policy-section" id="disclaimer">
            <div className="policy-section__number">03</div>
            <div>
              <p className="policy-section__eyebrow">Important information</p>
              <h2>Disclaimer</h2>
              <p>
                The information published on Startup Flash is for general
                informational purposes only. While we strive to ensure
                accuracy and reliability, we make no representations or
                warranties regarding the completeness, accuracy, or suitability
                of the information provided.
              </p>
              <p>
                Startup Flash does not provide financial, legal, or investment
                advice. Any action you take based on the content available on
                this website is strictly at your own risk.
              </p>
              <p>
                Startup Flash will not be liable for any losses or damages
                arising from the use of our website or reliance on the
                information published.
              </p>
              <p>
                External links may be included for reference purposes. We do
                not control or take responsibility for the content, policies, or
                practices of third-party websites.
              </p>
            </div>
          </section>

          <section className="policy-section" id="terms">
            <div className="policy-section__number">04</div>
            <div>
              <p className="policy-section__eyebrow">Using StartupFlash</p>
              <h2>Terms &amp; Conditions</h2>
              <p>
                By accessing and using Startup Flash, you agree to comply with
                these terms and conditions.
              </p>
              <p>
                All content published on this website, including text,
                graphics, and logos, is the intellectual property of Startup
                Flash unless otherwise stated. Unauthorized reproduction or
                redistribution of content is prohibited.
              </p>
              <p>
                Users agree not to use the website for unlawful purposes or in a
                way that could harm the website or its users.
              </p>
              <p>
                Startup Flash reserves the right to modify, update, or
                discontinue any part of the website or these terms at any time
                without prior notice.
              </p>
              <p>
                Continued use of the website constitutes acceptance of any
                changes made to these terms and conditions.
              </p>
            </div>
          </section>
        </div>

        <footer className="policies-page__footer">
          <span>Questions about a policy?</span>
          <Link to="/contact">Contact StartupFlash</Link>
        </footer>
      </div>
    </main>
  )
}

export default Policies
