import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { ArrowUpRight, Mail, MessageCircle, Send } from "lucide-react"
import "../styles/pages/contact.css"

const contactOptions = [
  {
    title: "Share a news tip",
    description: "Have a funding round, launch, acquisition, or market signal to share? Send the details to our editorial team.",
    subject: "StartupFlash news tip"
  },
  {
    title: "Editorial questions",
    description: "Ask about a story, suggest a correction, or start a conversation with the StartupFlash newsroom.",
    subject: "StartupFlash editorial inquiry"
  },
  {
    title: "Partnerships",
    description: "For collaborations, community initiatives, and other partnership ideas, we would be glad to hear from you.",
    subject: "StartupFlash partnership inquiry"
  }
]

function Contact() {
  return (
    <section className="contact-page">
      <Helmet>
        <title>Contact Us | StartupFlash</title>
        <meta
          name="description"
          content="Contact StartupFlash with a news tip, editorial question, partnership idea, or feedback."
        />
      </Helmet>

      <div className="contact-page__inner">
        <header className="contact-page__hero">
          <p className="contact-page__eyebrow">Contact StartupFlash</p>
          <h1>Let&apos;s start a useful conversation.</h1>
          <p>
            Whether you have a story to share, a question about our coverage,
            or an idea for working together, our inbox is open.
          </p>
          <a
            className="contact-page__primary-link"
            href="mailto:yourstartupflash@gmail.com?subject=StartupFlash%20inquiry"
          >
            <Mail size={18} aria-hidden="true" />
            yourstartupflash@gmail.com
          </a>
        </header>

        <div className="contact-page__options" aria-label="Contact options">
          {contactOptions.map((option) => (
            <article className="contact-page__option" key={option.title}>
              <MessageCircle size={20} aria-hidden="true" />
              <h2>{option.title}</h2>
              <p>{option.description}</p>
              <a
                href={`mailto:yourstartupflash@gmail.com?subject=${encodeURIComponent(option.subject)}`}
              >
                Email the team <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <section className="contact-page__feature" aria-labelledby="contact-feature-title">
          <div>
            <p className="contact-page__eyebrow">Want coverage?</p>
            <h2 id="contact-feature-title">Submit your startup story for review.</h2>
            <p>
              Use our dedicated submission form when you are sharing a launch,
              funding milestone, founder story, or company update.
            </p>
          </div>
          <Link className="contact-page__feature-link" to="/get-featured">
            Submit a story <Send size={16} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </section>
  )
}

export default Contact
