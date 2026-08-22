import { Helmet } from "react-helmet-async"
import { ArrowUpRight, BadgeCheck, Mail, Megaphone, Target } from "lucide-react"
import "../styles/pages/advertise.css"

const opportunities = [
  {
    title: "Sponsored coverage",
    description: "Introduce a relevant launch, report, or initiative to StartupFlash readers through clearly labelled sponsored content.",
    icon: Megaphone
  },
  {
    title: "Newsletter partnerships",
    description: "Place your message alongside the stories founders, operators, and startup-curious readers are following.",
    icon: Mail
  },
  {
    title: "Custom campaigns",
    description: "Work with us on a focused campaign designed around your audience, timing, and business objective.",
    icon: Target
  }
]

function Advertise() {
  return (
    <section className="advertise-page">
      <Helmet>
        <title>Advertise With Us | StartupFlash</title>
        <meta
          name="description"
          content="Explore sponsored coverage, newsletter partnerships, and custom campaigns with StartupFlash."
        />
      </Helmet>

      <div className="advertise-page__inner">
        <header className="advertise-page__hero">
          <div>
            <p className="advertise-page__eyebrow">Advertise With StartupFlash</p>
            <h1>Reach readers who are building what&apos;s next.</h1>
            <p>
              StartupFlash connects your message with people following startup
              funding, founders, companies, and emerging technology.
            </p>
          </div>
          <a
            className="advertise-page__hero-link"
            href="mailto:yourstartupflash@gmail.com?subject=StartupFlash%20advertising%20inquiry"
          >
            Start an advertising conversation <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </header>

        <section className="advertise-page__intro" aria-labelledby="advertise-intro-title">
          <BadgeCheck size={22} aria-hidden="true" />
          <div>
            <h2 id="advertise-intro-title">Relevant, transparent, and built around your goals.</h2>
            <p>
              We only consider partnerships that are useful to our audience. All
              paid placements and sponsored coverage are clearly identified.
            </p>
          </div>
        </section>

        <section className="advertise-page__opportunities" aria-label="Advertising opportunities">
          {opportunities.map(({ title, description, icon: Icon }) => (
            <article className="advertise-page__opportunity" key={title}>
              <Icon size={22} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="advertise-page__cta" aria-labelledby="advertise-cta-title">
          <div>
            <p className="advertise-page__eyebrow">Plan a campaign</p>
            <h2 id="advertise-cta-title">Tell us what you want to achieve.</h2>
            <p>
              Include your company, campaign timing, audience, and preferred
              format. We will reply with the most suitable next step.
            </p>
          </div>
          <a
            className="advertise-page__cta-link"
            href="mailto:yourstartupflash@gmail.com?subject=StartupFlash%20advertising%20inquiry"
          >
            <Mail size={17} aria-hidden="true" />
            Email StartupFlash
          </a>
        </section>
      </div>
    </section>
  )
}

export default Advertise
