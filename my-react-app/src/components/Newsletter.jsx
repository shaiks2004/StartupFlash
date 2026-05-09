function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <div>
        <p>THE WEEKLY DISPATCH</p>
        <h2>
          Startup intelligence, funding moves, and founder playbooks — curated
          weekly.
        </h2>
      </div>
      <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  )
}

export default Newsletter
