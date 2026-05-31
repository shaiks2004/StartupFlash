import React from "react";

const AboutUs = () => {
	return (
		<section className="about-us">
			<div className="about-us__inner">
				<header className="about-us__header">
					<p className="about-us__eyebrow">About Us</p>
					<h1 className="about-us__title">Startup Flash</h1>
					<p className="about-us__lede">
						We cover startups, technology, and the founders shaping what is next.
					</p>
				</header>

				<div className="about-us__content">
					<div className="about-us__section">
						<h2 className="about-us__section-title">Our Mission</h2>
						<p className="about-us__section-body">
							Add your mission statement here.
						</p>
					</div>

					<div className="about-us__section">
						<h2 className="about-us__section-title">What We Cover</h2>
						<p className="about-us__section-body">
							Add your editorial focus and beats here.
						</p>
					</div>

					<div className="about-us__section">
						<h2 className="about-us__section-title">Our Story</h2>
						<p className="about-us__section-body">
							Add your origin story and timeline here.
						</p>
					</div>

					<div className="about-us__section">
						<h2 className="about-us__section-title">Contact</h2>
						<p className="about-us__section-body">
							Add your contact details and social links here.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
export default AboutUs;
