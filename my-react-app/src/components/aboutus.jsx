import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import "../styles/pages/aboutus.css"

const coverage = [
	"Funding rounds and startup finance",
	"Acquisitions and strategic moves",
	"Product launches and new releases",
	"Founder stories and operator perspectives",
	"Emerging business and market trends",
]

const principles = [
	{
		title: "Clarity first",
		body: "We simplify complex startup news so it is easy to understand and act on.",
	},
	{
		title: "Timely reporting",
		body: "We focus on the stories that matter right now across Indian and global startups.",
	},
	{
		title: "Value over hype",
		body: "Every update is meant to be useful, relevant, and worth your time.",
	},
	{
		title: "Built for learners",
		body: "Students, founders, and professionals can use Startup Flash to stay informed with confidence.",
	},
]

const audience = [
	"Students building business awareness",
	"Aspiring entrepreneurs tracking opportunities",
	"Founders and operators following market shifts",
	"Readers who want concise, meaningful updates",
]

const stats = [
	{ value: "Clear", label: "news that is easy to understand" },
	{ value: "Timely", label: "coverage across startup and business news" },
	{ value: "Useful", label: "reporting built around real decisions" },
]

const AboutUs = () => {
	return (
		<section className="about-us">
			<Helmet>
				<title>About Us | StartupFlash</title>
				<meta
					name="description"
					content="Learn how Startup Flash delivers clear, timely coverage of startups, business, funding, founders, and emerging trends."
				/>
			</Helmet>

			<div className="about-us__inner">
				<header className="about-us__hero">
					<div className="about-us__hero-copy">
						<p className="about-us__eyebrow">About Us</p>
						<h1 className="about-us__title">Startup Flash</h1>
						<p className="about-us__lede">
							Startup Flash is a digital media platform focused on delivering clear and timely updates from the startup and business ecosystem.
						</p>
						<p className="about-us__summary">
							We simplify complex startup news and present it in a way that is easy to understand and relevant. Our reporting is designed to help readers quickly grasp what matters without losing the important details.
						</p>
						<div className="about-us__hero-tags">
							<span className="about-us__hero-tag">Startup news</span>
							<span className="about-us__hero-tag">Business ecosystem</span>
							<span className="about-us__hero-tag">Founder stories</span>
						</div>
					</div>

					<div className="about-us__hero-panel">
						<div className="about-us__panel-top">
							<p className="about-us__panel-label">Editorial profile</p>
							<h2 className="about-us__panel-title">Focused coverage with a clean reading experience.</h2>
						</div>
						<div className="about-us__stats-grid">
							{stats.map((item) => (
								<div key={item.value} className="about-us__stat">
									<strong>{item.value}</strong>
									<span>{item.label}</span>
								</div>
							))}
						</div>
						<ul className="about-us__signal-list about-us__signal-list--compact">
							<li>Indian and global startup coverage</li>
							<li>Funding, acquisitions, and product launches</li>
							<li>Founder stories and emerging business trends</li>
						</ul>
					</div>
				</header>

				<div className="about-us__content">
					<section className="about-us__feature-card about-us__feature-card--wide">
						<p className="about-us__section-kicker">Our Mission</p>
						<h2 className="about-us__section-title">Make startup reporting useful, clear, and accessible.</h2>
						<p className="about-us__section-body">
							Startup Flash was created with the belief that access to the right information can empower individuals to take informed decisions. Whether you are a student, an aspiring entrepreneur, or someone interested in business, our platform helps you stay updated with what truly matters.
						</p>
					</section>

					<section className="about-us__feature-card">
						<p className="about-us__section-kicker">What We Cover</p>
						<h2 className="about-us__section-title">The stories that move the ecosystem.</h2>
						<div className="about-us__chip-list">
							{coverage.map((item) => (
								<span key={item} className="about-us__chip">
									{item}
								</span>
							))}
						</div>
						<p className="about-us__section-body about-us__section-body--soft">
							We keep the coverage mix broad enough to stay useful, but focused enough to stay readable.
						</p>
					</section>

					<section className="about-us__feature-card">
						<p className="about-us__section-kicker">Our Approach</p>
						<h2 className="about-us__section-title">Clarity, accuracy, and consistency.</h2>
						<p className="about-us__section-body">
							Our approach prioritizes clarity, accuracy, and consistency. We focus on value-driven content rather than unnecessary hype, ensuring that every update serves a purpose.
						</p>
					</section>

					<section className="about-us__feature-card">
						<p className="about-us__section-kicker">Who We Serve</p>
						<h2 className="about-us__section-title">Built for curious builders and readers.</h2>
						<ul className="about-us__audience-list">
							{audience.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</section>

					<section className="about-us__feature-card about-us__feature-card--full">
						<p className="about-us__section-kicker">Why It Matters</p>
						<h2 className="about-us__section-title">Built for people who need the signal, not the noise.</h2>
						<div className="about-us__principles-grid">
							{principles.map((item) => (
								<article key={item.title} className="about-us__principle">
									<h3>{item.title}</h3>
									<p>{item.body}</p>
								</article>
							))}
						</div>
						<p className="about-us__section-body about-us__section-body--closing">
							Startup Flash is building a community of learners, builders, and thinkers who are curious about innovation and entrepreneurship. Through concise reporting and meaningful insights, we aim to support the next generation of founders and professionals.
						</p>
						<div className="about-us__contact-line">
							<span className="about-us__contact-label">Contact</span>
							<a href="mailto:yourstartupflash@gmail.com" className="about-us__contact-link">
								yourstartupflash@gmail.com
							</a>
						</div>
					</section>
				</div>

				<div className="about-us__cta">
					<div>
						<p className="about-us__section-kicker">Stay Connected</p>
						<h2 className="about-us__cta-title">Follow the startup stories that matter.</h2>
						<p className="about-us__cta-copy">
							Reach out anytime if you want to share a story, tip, or partnership idea.
						</p>
					</div>
					<div className="about-us__cta-actions">
						<Link to="/" className="about-us__cta-button about-us__cta-button--primary">
							Read the latest
						</Link>
						<Link to="/get-featured" className="about-us__cta-button">
							Get featured
						</Link>
						<a href="mailto:yourstartupflash@gmail.com" className="about-us__cta-button">
							Email us
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUs
