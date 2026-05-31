function AdBanner({ label = "Advertisement", variant = "leaderboard" }) {
  return (
    <div className={`ad-banner ad-${variant}`} role="complementary" aria-label={label}>
      <span>{label}</span>
      <strong>Premium sponsor placement</strong>
    </div>
  )
}

export default AdBanner
