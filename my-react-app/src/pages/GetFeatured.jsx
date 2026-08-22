import { useState } from "react"
import { submitFeaturedSubmission } from "../services/api"
import "../styles/pages/get-featured.css"

const CATEGORY_OPTIONS = [
  "Funding News",
  "Founder Story",
  "Startup Launch",
  "Product Announcement",
  "Acquisition",
  "Partnership",
  "AI Startup",
  "General Feature"
]

function GetFeatured() {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    linkedin: "",
    category: "",
    description: "",
    termsAccepted: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await submitFeaturedSubmission(formData)
      alert("Submission sent successfully!")

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        website: "",
        linkedin: "",
        category: "",
        description: "",
        termsAccepted: false
      })
    } catch (error) {
      console.error(error)
      alert(error.status ? "Submission failed" : "Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="featured-form-page">
      <div className="featured-form-container">
        <h1>Get Featured on StartupFlash 🚀</h1>

        <p>
          Share your startup story, funding announcement, founder journey,
          product launch, partnership, acquisition, or major milestone.
        </p>

        <form onSubmit={handleSubmit} className="featured-form">
          <div className="form-grid">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="companyName"
              placeholder="Startup / Company Name *"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <input
              type="url"
              name="website"
              placeholder="Company Website *"
              value={formData.website}
              onChange={handleChange}
              required
            />

            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn / Social Profile"
              value={formData.linkedin}
              onChange={handleChange}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Coverage Type *</option>

              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <textarea
            rows="7"
            name="description"
            placeholder="Describe your startup, funding, launch, achievement, or story *"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label className="featured-terms">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <span>
              I approve the <a href="/terms#terms">Terms &amp; Conditions</a>
            </span>
          </label>

          <button
            type="submit"
            className="submit-featured-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Story"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default GetFeatured
