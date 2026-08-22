import { useState } from "react"
import { subscribeToNewsletter } from "../services/api"
import "../styles/components/newsletter.css"

function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const value = email.trim()

    if (!value) {
      setError("Email is required")
      setSuccess("")
      return
    }

    if (!termsAccepted) {
      setError("Please approve the Terms & Conditions")
      setSuccess("")
      return
    }

    try {
      setLoading(true)
      setError("")
      const response = await subscribeToNewsletter({ email: value, termsAccepted })
      setSuccess(response.message || "Subscription successful")
      setEmail("")
      setTermsAccepted(false)
    } catch (submitError) {
      setSuccess("")
      setError(submitError.message || "Unable to subscribe right now")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      <div>
        <p>THE WEEKLY DISPATCH</p>
        <h2>
          Startup intelligence, funding moves, and founder playbooks, curated
          weekly.
        </h2>
      </div>
      <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          aria-invalid={Boolean(error)}
        />
        <label className="newsletter-terms">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            disabled={loading}
            required
          />
          <span>
            I approve the <a href="/terms#terms">Terms &amp; Conditions</a>
          </span>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      <div className="newsletter-status" aria-live="polite">
        {error && <p className="newsletter-error">{error}</p>}
        {success && <p className="newsletter-success">{success}</p>}
      </div>
    </section>
  )
}

export default Newsletter
